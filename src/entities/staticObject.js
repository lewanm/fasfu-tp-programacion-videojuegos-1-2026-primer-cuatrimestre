import { Entity } from "./entity.js";
import { ASSETS } from "../config/assets.js";
import { OBJECT_TEMPLATES } from "../config/worldObjects.js";
import { ProgressBar } from "../UI/progressBar.js";
import { ITEMS } from "../config/items.js";

const PLACEHOLDER_NAME = "static_object"

export class WorkStation extends Entity{

    static textures = {};

    static async loadTextures() {
        const types = Object.keys(OBJECT_TEMPLATES)

        await Promise.all(
            types.map(async (type) => {
                if (!WorkStation.textures[type]) {
                    const assetPath = ASSETS.STATIC_OBJECTS[OBJECT_TEMPLATES[type].name]
                    if (assetPath) {
                        WorkStation.textures[type] = await PIXI.Assets.get(assetPath)
                    }
                }
            })
        );
    }

    constructor(type, position = {}) {
        const config = OBJECT_TEMPLATES[type] || {}
        const texture = WorkStation.textures[type]

        if(!texture){
            console.warn(`No se encontró textura cargada para el tipo: ${type}`)
        }

        const sprite = new PIXI.Sprite(texture) 
        sprite.anchor.set(0, 1);

        const container = new PIXI.Container()
        container.addChild(sprite)
        container.label = "WorkStation"

        super(container, config);
        
        this.sprite = sprite
        
        this.type = type
        this.name = config.name ?? PLACEHOLDER_NAME

        this.x = position.x ?? 0
        this.y = position.y ?? 0

        this.isSolid = config.isSolid ?? true
        this.trigger = config.trigger ?? null

        this.itemFactory = config.itemFactory ?? null

        this.updateTransform()
        
    }
    //le hice un override a si no lo centra, ya que el modifique el pivote para colocarlo mas facil
    getBounds(x = this.x, y = this.y) {
        return {
            x: x + this.hitboxOffset.x,
            y: y - this.height + this.hitboxOffset.y,
            width: this.width,
            height: this.height 
        };
    }

    getTriggerBounds(){

        if (!this.trigger) return null

        return this.getBoundsWithOffset(
            this.trigger.width,
            this.trigger.height,
            this.trigger.offset
        );
    }
    
    interact(player){}
}

class ItemProvider extends WorkStation{
    
    interact(player){
        if (!this.itemFactory) return

        const item = this.itemFactory()

        player.receiveItem(item)
    }
}

class ItemProcessor extends WorkStation {

    constructor(type, position) {
        super(type, position)

        const sprite = new PIXI.Sprite()
        sprite.visible = false
        sprite.anchor.set(0.5, 0.5)

        const bar = new ProgressBar({width: 18, height: 3})

        this.view.addChild(sprite)
        this.view.addChild(bar.view)

        this.slot = {
            item: null,
            progress: 0,
            view: sprite,
            bar
        };

        const config = OBJECT_TEMPLATES[type] || {}

        this.foodPosition = config.foodPosition ?? { x: 25, y: -38 }
        this.foodScale = config.foodScale ?? 0.7
        this.acceptedTypes = config.acceptedTypes ?? []
    }

    canProcess(item) {
        return this.acceptedTypes.includes(item.type)
    }

    interact(player) {
        const slot = this.slot

        // Poner
        if (player.heldItem) {

            if (slot.item) {
                console.log("La estación está ocupada")
                return
            }

            if (!this.canProcess(player.heldItem)) {
                console.log("Este item no se puede procesar")
                return
            }

            slot.item = player.removeItem(); //no se si es lo mejor, pero va a quedar asi
            slot.progress = 0

            this.updateView()

            return;
        }

        // Sacar
        if (!slot.item) {
            console.log("No hay nada");
            return
        }

        if (slot.item.state !== "cooked") {
            console.log("Aún no está listo")
            return
        }

        const success = player.receiveItem(slot.item)
        if (!success) return

        this.clearSlot()
    }

    update(delta) {

        const slot = this.slot

        if (!slot.item) return

        if (!this.canProcess(slot.item)) return

        if (slot.item.state !== "raw") return

        if (!slot.item.cookTime) return

        slot.progress += delta

        const ratio = slot.progress / slot.item.cookTime

        slot.bar.setProgress(ratio)

        if (slot.progress < slot.item.cookTime) return

        slot.item = this.getProcessedItem()

        console.log(`${slot.item.type} listo`)

        this.updateView()
    }

    
    getProcessedItem() {
        return {
            ...this.processedItem
        }
    }

    clearSlot() {
        this.slot.item = null
        this.slot.progress = 0
        this.updateView()
    }

    updateView() {

        const slot = this.slot
        const sprite = slot.view
        const bar = slot.bar.view

        const FOOD_POS = {
            x: this.foodPosition.x,
            y: this.foodPosition.y
        }

        if (!slot.item) {

            sprite.visible = false
            bar.visible = false

            return
        }

        const texture = PIXI.Assets.get(slot.item.asset)

        sprite.texture = texture
        sprite.scale.set(this.foodScale)
        sprite.visible = true

        bar.visible = slot.item.state === "raw"

        sprite.x = FOOD_POS.x
        sprite.y = FOOD_POS.y

        bar.x = sprite.x
        bar.y = sprite.y - 15
    }
}

class TrayStation extends WorkStation {
    
    constructor(position){
        super("tray", position)

        const config = OBJECT_TEMPLATES.tray

        this.itemSlots = config.itemSlots ?? []
        this.itemScale = config.itemScale ?? 1

        this.items = []
        this.maxSlots = 3
        
        this.itemsViews = []

        for (let i = 0; i < this.maxSlots; i++) {

            const sprite = new PIXI.Sprite()

            sprite.visible = false
            sprite.anchor.set(0.5)

            this.view.addChild(sprite)

            this.itemsViews.push(sprite)
        }
    }

    canAccept(item){
        if (this.items.length >= this.maxSlots) return false

        if (item.type === "tray") return false

        return item.state === "cooked" || item.type === "soda"
    }

    isEmpty(){
        return this.items.length === 0
    }

    interact(player){

        if (!player.heldItem && this.isEmpty()){
            console.log("No tenes nada para guardar")
            return
        }

        // Agregar item a la bandeja
        if (player.heldItem){

            const item = player.heldItem

            if (!this.canAccept(item)){

                console.log(`${item.type} ${item.state ?? item.variant} no va en la bandeja`)

                return
            }

            this.items.push(this.getServedItem(player.removeItem()))

            console.log("item agregado a la bandeja")

            this.updateView()

            return
        }

        // Retirar bandeja
        if (this.isEmpty()){

            console.log("bandeja vacia")

            return
        }

        const trayItem = {
            type: "tray",
            contents: [...this.items]
        }

        const success = player.receiveItem(trayItem)

        if (!success) return

        this.items = []

        console.log("Bandeja levantada")

        this.updateView()
    }

    updateView(){

        this.itemsViews.forEach(sprite => {

            sprite.visible = false
        })

        this.items.forEach((item, index) => {

            const sprite = this.itemsViews[index]

            const slot = this.itemSlots[index]

            if (!slot) return

            const texture = PIXI.Assets.get(item.asset)

            sprite.texture = texture

            sprite.scale.set(this.itemScale)
            // pa probar como queda
            if (item.type === "burger") sprite.scale.set(0.5)

            sprite.x = slot.x
            sprite.y = slot.y

            sprite.visible = true
        })
    }

    getServedItem(item){

        switch (item.type) {

            case "burger":
                return {
                    ...ITEMS.SERVED_BURGER
                }

            case "fries":
                return {
                    ...ITEMS.SERVED_FRIES
                }

            default:
                return item
        }
    }
}

//ver si lo dejo aca o cada objeto su archivo independiente
class Fridge extends ItemProvider{
    constructor(position){
        super("fridge", position)
    }
}

class SodaDispenser extends ItemProvider {
    constructor(position) {
        super("soda", position);
    }
}

class Oven extends ItemProcessor {
    constructor(position) {
        super("oven", position);
        this.processedItem = { ...ITEMS.COOKED_BURGER }
    }
}

class ThrashCan extends ItemProcessor {
    constructor(position) {
        super("thrash", position);
    }

    interact(player) {
        if (!player.heldItem){
            console.log("No tenes nada para tirar")
            return
        }

        //puedo hacer directamente player.removeItem() pero lo dejo asi pa debuguear y ver mensajitos en consola.
        const item = player.removeItem()
        console.log(`${item.name} fue descartado`)
    }
}

class Fryer extends ItemProcessor {
    constructor(position) {
        super("fryer", position);
        this.processedItem = { ...ITEMS.COOKED_FRIES }
    }
}

export const WORK_STATIONS = {
    fridge: Fridge,
    fryer: Fryer,
    oven: Oven,
    soda: SodaDispenser,
    tray: TrayStation,
    thrashCan: ThrashCan
}
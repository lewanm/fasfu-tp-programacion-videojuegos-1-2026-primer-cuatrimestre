import { Entity } from "./entity.js";
import { ASSETS } from "../config/assets.js";
import { OBJECT_TEMPLATES, ITEM_TEMPLATES } from "../config/worldObjects.js";
import { ProgressBar } from "../UI/progressBar.js";


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

        const g = new PIXI.Graphics()
        g.visible = false

        const bar = new ProgressBar({width: 18, height: 3})

        this.view.addChild(g)
        this.view.addChild(bar.view)

        this.slot = {
            item: null,
            progress: 0,
            view: g,
            bar: bar
        };

        const config = OBJECT_TEMPLATES[type] || {}
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

        const itemData = ITEM_TEMPLATES[slot.item.type];

        if (!itemData) return

        if (slot.item.state !== "raw") return

        slot.progress += delta

        const ratio = slot.progress / itemData.cookTime

        slot.bar.setProgress(ratio)

        if (slot.progress >= itemData.cookTime && slot.item.state !== "cooked") {

            slot.item.state = "cooked"

            console.log(`${slot.item.type} listo`)

            this.updateView()
        }
    }

    clearSlot() {
        this.slot.item = null
        this.slot.progress = 0
        this.updateView()
    }

    updateView() {
        const slot = this.slot
        const g = slot.view;
        const bar = slot.bar.view

        const FOOD_POS = { x: 20, y: -25 }

        g.clear()

        if (!slot.item) {
            g.visible = false
            bar.visible = false
            return
        }

        g.visible = true

        const itemData = ITEM_TEMPLATES[slot.item.type]

        let color = 0xffffff

        if (slot.item.state && itemData?.states?.[slot.item.state]){
            color = itemData.states[slot.item.state].color
        }

        if (slot.item.variant && itemData?.variants?.[slot.item.variant]){
            color = itemData.variants[slot.item.variant].color
        }

        g.circle(0, 0, 7)
        g.fill({ color })

        g.x = FOOD_POS.x
        g.y = FOOD_POS.y

        //subo la barra al graphics original
        bar.x = g.x
        bar.y = g.y - 15
    }
}

class TrayStation extends WorkStation {
    
    constructor(position){
        super("tray", position)

        this.items = []
        this.maxSlots = 3

        this.itemsViews = []

        for (let i = 0; i < this.maxSlots; i++) {
            const g = new PIXI.Graphics()
            g.visible = false

            this.view.addChild(g)
            this.itemsViews.push(g)
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

        if (player.heldItem){
            const item = player.heldItem

            if(!this.canAccept(item)) {
                console.log(`${item.type} ${item.state || item.variant} no va en la bandeja`)
                return
            }

            this.items.push(player.removeItem())

            console.log("item agregado a la bandeja")

            this.updateView()
            return
        }

        if (this.isEmpty()){
            console.log("bandeja vacia")
        }

        const tryItem = {
            type: "tray",
            contents: [...this.items]
        }

        const success = player.receiveItem(tryItem)
        if(!success) return

        this.items = []
        
        console.log("Bandeja soltada")

        this.updateView()
    }

    updateView(){
        const BASE_X = 10
        const BASE_Y = -20

        const SPACING = 12

        this.itemsViews.forEach(view => {
            view.clear()
            view.visible = false
        })

        this.items.forEach((item, index) => {
            const g = this.itemsViews[index]

            let color = ITEM_TEMPLATES[item.type]

            if (item.state === "cooked") color = 0x8B4513
            if (item.type === "soda") color = 0x3399ff

            g.circle(0, 0, 5)
            g.fill({color})

            g.x = BASE_X + index * SPACING
            g.y = BASE_Y
            
            g.visible = true
        })
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
    }
}

class ThrashCan extends ItemProcessor {
    constructor(position) {
        super("thrash", position);
    }
}

class Fryer extends ItemProcessor {
    constructor(position) {
        super("fryer", position);
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
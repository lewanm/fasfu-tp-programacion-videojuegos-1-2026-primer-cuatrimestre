import { Entity } from "./entity.js";
import { ASSETS } from "../config/assets.js";
import { OBJECT_TEMPLATES, ITEM_TEMPLATES } from "../config/worldObjects.js";


const PLACEHOLDER_NAME = "static_object"

export class WorkStation extends Entity{

    static textures = {};

    static async loadTextures() {
        const types = Object.keys(OBJECT_TEMPLATES);

        await Promise.all(
            types.map(async (type) => {
                if (!WorkStation.textures[type]) {
                    const assetPath = ASSETS.STATIC_OBJECTS[OBJECT_TEMPLATES[type].name];
                    if (assetPath) {
                        WorkStation.textures[type] = await PIXI.Assets.get(assetPath);
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
            x: x,
            y: y - this.height,
            width: this.width + this.hitboxOffset.x,
            height: this.height + this.hitboxOffset.y
        };
    }

    getTriggerBounds(){

        if (!this.trigger) return null;

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
        if (!this.itemFactory) return;

        const item = this.itemFactory();

        player.receiveItem(item);
    }
}

class ItemProcessor extends WorkStation {

    constructor(type, position) {
        super(type, position);

        const g = new PIXI.Graphics();
        g.visible = false;

        this.view.addChild(g);

        this.slot = {
            item: null,
            progress: 0,
            view: g
        };

        const config = OBJECT_TEMPLATES[type] || {};
        this.acceptedTypes = config.acceptedTypes ?? [];
    }

    canProcess(item) {
        return this.acceptedTypes.includes(item.type);
    }

    interact(player) {
        const slot = this.slot;

        // Poner
        if (player.heldItem) {

            if (slot.item) {
                console.log("La estación está ocupada");
                return;
            }

            if (!this.canProcess(player.heldItem)) {
                console.log("Este item no se puede procesar");
                return;
            }

            slot.item = player.removeItem(); //no se si es lo mejor, pero va a quedar asi
            slot.progress = 0;

            this.updateView();

            return;
        }

        // Sacar
        if (!slot.item) {
            console.log("No hay nada");
            return;
        }

        if (slot.item.state !== "cooked") {
            console.log("Aún no está listo");
            return;
        }

        const success = player.receiveItem(slot.item);
        if (!success) return;

        this.clearSlot();
    }

    update(delta) {
        const slot = this.slot;

        if (!slot.item) return;

        if (!this.canProcess(slot.item)) return;

        const itemData = ITEM_TEMPLATES[slot.item.type];

        if (!itemData) return;

        if (slot.item.state !== "raw") return

        slot.progress += delta;

        if (slot.progress >= itemData.cookTime && slot.item.state !== "cooked") {

            slot.item.state = "cooked";

            console.log(`${slot.item.type} listo`);

            this.updateView();
        }
    }

    clearSlot() {
        this.slot.item = null;
        this.slot.progress = 0;
        this.updateView();
    }

    updateView() {
        const slot = this.slot;
        const g = slot.view;

        g.clear();

        if (!slot.item) {
            g.visible = false;
            return;
        }

        g.visible = true;

        const itemData = ITEM_TEMPLATES[slot.item.type]

        let color = 0xffffff

        if (slot.item.state && itemData?.states?.[slot.item.state]){
            color = itemData.states[slot.item.state].color
        }

        if (slot.item.variant && itemData?.variants?.[slot.item.variant]){
            color = itemData.variants[slot.item.variant].color
        }

        g.circle(0, 0, 7)
        g.fill({ color });

        g.x = 20;
        g.y = -25;
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

class Fryer extends ItemProcessor {
    constructor(position) {
        super("fryer", position);
    }
}


/*
class Fryer extends WorkStation{
    constructor(position){
        super("fryer", position)
    }

    interact(player){
        console.log("cocinar papasfritas");
    }
}

class Oven extends WorkStation {
    constructor(position) {
        super("oven", position);

        this.cookTime = 200 //mover esto a config.

        const g = new PIXI.Graphics()
        g.visible = false

        this.view.addChild(g)

        this.slot = {
            item: null,
            progress: 0,
            view: g   
        }
    }

    interact(player) {

        const slot = this.slot

        if (player.heldItem){
            
            if (player.heldItem.type !== "burger"){
                console.log("No se puede cocinar este esto")
                return
            }

            if(slot.item){
                console.log("La cocina esta ocupada")
                return
            }

            slot.item = player.removeItem()
            slot.progress = 0

            this.updateView()

            return
        }

        if (!slot.item){
            console.log("La cocina esta vacia")
            return
        }

        if (slot.item.state !== "cooked"){
            console.log("Todavia esta crudo")
            return
        }

        const success = player.receiveItem(slot.item)

        if(!success) return

        slot.item = null
        slot.progress = 0 
        
        this.updateView()

    }

    update(delta){
        const slot = this.slot

        if (!slot.item) return

        if (slot.item.type !== "burger") return

        if (slot.item.state !== "raw") return

        slot.progress += delta

        if (slot.progress >= this.cookTime && slot.item.state !== "cooked"){
            slot.item.state = "cooked"
            console.log("Se cocino")
            this.updateView()
        }
    }

    //Modificar estemetodo cuando tenga el sprite.
    //TODO
    updateView(){
        //esto lo hago asi para tener algo visible hasta tener los sprites
        const slot = this.slot
        const g = slot.view

        g.clear()

        if(!slot.item){
            g.visible = false
            return
        }

        g.visible = true

        const color = slot.item.state === "cooked" 
            ? 0x884513
            : 0xff69b4

       
        
        g.circle(0, 0, 7)
        g.fill({color})
        g.x = 20
        g.y = -25

    }
}*/

export const WORK_STATIONS = {
    fridge: Fridge,
    fryer: Fryer,
    oven: Oven,
    soda: SodaDispenser
}
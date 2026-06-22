import { Entity } from "./entity.js";
import { ASSETS } from "../config/assets.js";
import { OBJECT_TEMPLATES } from "../world/worldObjects.js";

const PLACEHOLDER_NAME = "static_object"

export class StaticObject extends Entity{

    static textures = {};

    static async loadTextures() {
        const types = Object.keys(OBJECT_TEMPLATES);

        await Promise.all(
            types.map(async (type) => {
                if (!StaticObject.textures[type]) {
                    const assetPath = ASSETS.STATIC_OBJECTS[OBJECT_TEMPLATES[type].name];
                    if (assetPath) {
                        StaticObject.textures[type] = await PIXI.Assets.get(assetPath);
                    }
                }
            })
        );
    }

    constructor(type, position = {}) {
        const config = OBJECT_TEMPLATES[type] || {}
        const texture = StaticObject.textures[type]

        if(!texture){
            console.warn(`No se encontró textura cargada para el tipo: ${type}`)
        }

        super(new PIXI.Sprite(texture), config);
        
        this.type = type
        this.view.anchor.set(0, 1);
        this.name = config.name ?? PLACEHOLDER_NAME

        this.x = position.x ?? 0
        this.y = position.y ?? 0

        this.isSolid = config.isSolid ?? true
        this.trigger = config.trigger ?? null

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

//ver si lo dejo aca o cada objeto su archivo independiente
class Fridge extends StaticObject{
    constructor(position){
        super("fridge", position)
    }

    interact(player){
        console.log("Dar hamburguesa");
    }
}

class Fryer extends StaticObject{
    constructor(position){
        super("fryer", position)
    }

    interact(player){
        console.log("cocinar papasfritas");
    }
}

class SodaDispenser extends StaticObject {
    constructor(position) {
        super("soda", position);
    }

    interact(player) {
        console.log("Elegir gaseosa");
    }
}

class Oven extends StaticObject {
    constructor(position) {
        super("oven", position);
    }

    interact(player) {
        console.log("Cocinar hamburguesa en el horno");
    }
}

export const WORK_STATIONS = {
    fridge: Fridge,
    fryer: Fryer,
    oven: Oven,
    soda: SodaDispenser
}
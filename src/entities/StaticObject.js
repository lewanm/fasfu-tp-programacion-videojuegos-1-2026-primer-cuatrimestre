import { Entity } from "./entity.js";
import { ASSETS } from "../config/assets.js";

const PLACEHOLDER_NAME = "static_object"

class StaticObject extends Entity{

    static texture = null

    static async loadTexture(){
        if (!this.texture){
            this.texture = await PIXI.Assets.get(ASSETS.STATIC_OBJECTS[this.assetKey])
        }
    }
    //MODIFIQUE
    constructor(texture, position = {}, options = {}) {
        super(new PIXI.Sprite(texture), options);
        
        this.name = options.name ?? PLACEHOLDER_NAME

        this.x = position.x + this.width / 2 ?? 0
        this.y = position.y - this.height / 2 ?? 0

        this.isSolid = options.isSolid ?? true

        this.trigger = options.trigger ?? null

        this.updateTransform()
        
    }

    getTriggerBounds(){

        if (!this.trigger) return null;

        return this.getBoundsWithOffset(
            this.trigger.width,
            this.trigger.height,
            this.trigger.offset
        );
    }

    
    interact(player){
        if (!this.trigger) return;
    }

}

//ver si lo dejo aca o cada objeto su archivo independiente
export class Fridge extends StaticObject{

    static assetKey = "fridge"
    //no me gusta para nada esto... despues ver con Gemini
    constructor(position){
        super(Fridge.texture, position, {
            name: "fridge",
            width: 36,
            height: 76,
            asset: ASSETS.FRIDGE,
            hitboxOffset: {x:0,y:0},

            trigger:{
                type: "interact",
                width: 60,
                height: 40,
                offset: {x:0, y: 30}
            } 
         })
    }

    
    interact(player){
        console.log("Dar hamburguesa");
    }

}

export class Frier extends StaticObject{

    static assetKey = "fridge"
    static texture = null

    static async load(){
        await this.loadTexture(this.assetKey)
    }

    constructor(texture, position){
        super(texture, position, {
            name: "fridge",
            width: 40,
            height: 60,
            asset: ASSETS.FRIDGE,
            hitboxOffset: {x:0,y:0},
            trigger:{
                type: "interact",
                radius: 30
                } 
            }
        )
    }
}

export default {
    Fridge,
    Frier
}
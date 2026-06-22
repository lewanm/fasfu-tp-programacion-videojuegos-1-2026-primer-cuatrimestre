import { Entity } from "./entity.js";
import { ASSETS } from "../config/assets.js";

const PLACEHOLDER_NAME = "static_object"

class StaticObject extends Entity{

    static texture = null

    static async getTexture(){
        if (!this.texture){
            this.texture = await PIXI.Assets.get(ASSETS.STATIC_OBJECTS[this.assetKey])
        }
    }

    //MODIFIQUE
    constructor(texture, position = {}, options = {}) {
        super(new PIXI.Sprite(texture), options);
        
        this.view.anchor.set(0, 1);
        this.name = options.name ?? PLACEHOLDER_NAME

        this.x = position.x
        this.y = position.y

        this.isSolid = options.isSolid ?? true

        this.trigger = options.trigger ?? null

        this.updateTransform()
        
    }
    //lo piso porque no necesito que se este el pivote a 0.5 y no quiero modificar mucho mas el codigo del padre
    getBounds(x = this.x, y = this.y) {
        return {
            x: x,
            y: y - this.height,
            width: this.width,
            height: this.height
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

    
    interact(player){
        if (!this.trigger) return;
    }

}

//ver si lo dejo aca o cada objeto su archivo independiente
class Fridge extends StaticObject{

    static assetKey = "fridge"
    //no me gusta para nada esto... despues ver con Gemini
    constructor(position){
        super(Fridge.texture, position, {
            name: "fridge",
            width: 36,
            height: 76,
            hitboxOffset: {x:0,y:0},

            trigger:{
                type: "interact",
                width: 40,
                height: 30,
                offset: {x:0, y: 54}
            } 
         })
    }


    interact(player){
        console.log("Dar hamburguesa");
    }

}

class Fryer extends StaticObject{

    static assetKey = "fryer"
    //no me gusta para nada esto... despues ver con Gemini
    constructor(position){
        super(Fryer.texture, position, {
            name: "fryer",
            width: 36,
            height: 76,
            asset: ASSETS.FRIDGE, //ver si lo obtengo de aca, o lo recibo como hice por parametros, pero no me gusta como quedo actualmente... a revisar
            hitboxOffset: {x:0,y:0},

            trigger:{
                type: "interact",
                width: 40,
                height: 30,
                offset: {x:0, y: 54}
            } 
         })
    }

    
    interact(player){
        console.log("Dar hamburguesa");
    }

}

class SodaDispenser extends StaticObject{

    static assetKey = "soda"
    //no me gusta para nada esto... despues ver con Gemini
    constructor(position){
        super(SodaDispenser.texture, position, {
            name: "soda",
            width: 36,
            height: 76,
            asset: ASSETS.FRIDGE, //ver si lo obtengo de aca, o lo recibo como hice por parametros, pero no me gusta como quedo actualmente... a revisar
            hitboxOffset: {x:0,y:0},

            trigger:{
                type: "interact",
                width: 40,
                height: 30,
                offset: {x:0, y: 54}
            } 
         })
    }

    
    interact(player){
        console.log("Elegir gaseosa");
    }

}

class Oven extends StaticObject{

    static assetKey = "oven"
    //no me gusta para nada esto... despues ver con Gemini
    constructor(position){
        super(Oven.texture, position, {
            name: "oven",
            width: 36,
            height: 76,
            asset: ASSETS.FRIDGE, //ver si lo obtengo de aca, o lo recibo como hice por parametros, pero no me gusta como quedo actualmente... a revisar
            hitboxOffset: {x:0,y:0},

            trigger:{
                type: "interact",
                width: 40,
                height: 30,
                offset: {x:0, y: 54}
            } 
         })
    }

    
    interact(player){
        console.log("cocinar hamburguesa");
    }

}

export const WORK_STATIONS = {
    fridge: Fridge,
    fryer: Fryer,
    oven: Oven,
    soda: SodaDispenser
}
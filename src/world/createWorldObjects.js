import { WORLD_OBJECTS } from "./worldObjects.js"
import { Fridge } from "../entities/StaticObject.js"

export async function createWorldObjects(){
    
    const objects = []
    const container = new PIXI.Container()
    container.label = "objects"

    const OBJECT_CLASSES = {
        fridge: Fridge
    }

    const classes = Object.values(OBJECT_CLASSES)

    await Promise.all(
        classes.map(ObjClass => ObjClass.loadTexture())
    )

    //un factory para crear objetos dependiendo del tipo
    for (const obj of WORLD_OBJECTS){
        
        const ObjClass = OBJECT_CLASSES[obj.type];

        if (!ObjClass){
            console.warn(`Tipo desconocido: ${obj.type}`);
            continue;
        }

        const instance = new ObjClass(obj);
        console.log(instance)
        container.addChild(instance.view);
        objects.push(instance);
    }

    
    return {
        objects,
        container
    }
}
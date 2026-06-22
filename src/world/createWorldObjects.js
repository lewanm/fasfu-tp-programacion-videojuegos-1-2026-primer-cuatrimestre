import { WORLD_OBJECTS } from "./worldObjects.js"
import { StaticObject, WORK_STATIONS } from "../entities/StaticObject.js"

export async function createWorldObjects(){
    const objects = []
    const container = new PIXI.Container()
    container.label = "work_stations"

    await StaticObject.loadTextures()

    for (const obj of WORLD_OBJECTS) {
        const ObjClass = WORK_STATIONS[obj.type];

        if (!ObjClass) {
            console.warn(`Tipo desconocido en WORK_STATIONS: ${obj.type}`);
            continue;
        }

        // Instanciamos pasándole solo la posición, la subclase sabe qué tipo es internamente
        const instance = new ObjClass(obj.position);
        
        container.addChild(instance.view);
        objects.push(instance);
    }

    
    return {
        objects,
        container
    }
}
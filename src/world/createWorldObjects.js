import { WORLD_OBJECTS } from "../config/worldObjects.js"
import { WorkStation, WORK_STATIONS } from "../entities/staticObject.js"

export async function createWorldObjects(){
    const objects = []
    const container = new PIXI.Container()
    container.label = "work_stations"

    await WorkStation.loadTextures()

    for (const obj of WORLD_OBJECTS) {
        const ObjClass = WORK_STATIONS[obj.type];
        
        if (!ObjClass) {
            console.warn(`Tipo desconocido en WORK_STATIONS: ${obj.type}`);
            continue;
        }

        // Instanciamos pasándole solo la posición, la subclase sabe qué tipo es internamente
        const instance = new ObjClass(obj.position);
        instance.view.label = obj.type
        container.addChild(instance.view);
        objects.push(instance);
    }

    
    return {
        objects,
        container,
        update(delta){
            objects.forEach(obj => obj.update?.(delta))
        }
    }
}
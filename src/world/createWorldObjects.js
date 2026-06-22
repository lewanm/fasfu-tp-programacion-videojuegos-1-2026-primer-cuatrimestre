import { WORLD_OBJECTS } from "./worldObjects.js"
import { WORK_STATIONS } from "../entities/StaticObject.js"

export async function createWorldObjects(){
    
    const objects = []
    const container = new PIXI.Container()
    container.label = "work_stations"

    const classes = Object.values(WORK_STATIONS)

    console.log(classes)
  
    const heladera = classes[0]
    console.log(heladera)
    
    await Promise.all(
        classes.map(ObjClass => ObjClass.getTexture())
    )

    
    for (const obj of WORLD_OBJECTS){
        
        const ObjClass = WORK_STATIONS[obj.type];

        if (!ObjClass){
            console.warn(`Tipo desconocido: ${obj.type}`);
            continue;
        }

        console.log("obj: ",obj)
        const instance = new ObjClass(obj);
        container.addChild(instance.view);
        objects.push(instance);
    }

    
    return {
        objects,
        container
    }
}
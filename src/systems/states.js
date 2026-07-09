import { PATHS } from "../config/navigationPaths.js";
import { normalize } from "../utils/math.js";

class State {
    constructor(){
        this.debugColor = 0xffffff;
        this.name = "base"; // Agregamos un nombre por si necesitas debugear strings
    }

    enter(npc){}
    exit(npc){}
    update(npc, delta){}
}

class WalkingState extends State {
    constructor(){
        super();
        this.name = "walking";
        this.debugColor = 0xffffff;
    }

    enter(npc){
        console.log(`NPC ${npc.name} empezó a caminar.`);
    }

    update(npc, delta){
        const { x: dx, y: dy } = normalize(npc.dirX, npc.dirY);
        npc.moveWithCollision(dx, dy, delta);
    }
    
    exit(npc){}
}

class QueueState extends State {
    constructor(){
        super();
        this.name = "queue";
        this.debugColor = 0x00ff00; // Verde para la fila
    }

    enter(npc){
        // REGLA DE ORO: Apenas entra a la fila, frenamos sus direcciones lógicas
        npc.lastDir = {x: npc.dirX, y: npc.dirY}
        npc.dirX = 0;
        npc.dirY = 0;
    }

    update(npc, delta){
        if (npc.currentWaypoint < npc.path.length){
            const target = npc.path[npc.currentWaypoint]

            const arrived = npc.moveToTarget(target, delta)

            if (arrived) npc.currentWaypoint++

            return
        }

        if (!npc.queueTargetPosition) return

        const arrived = npc.moveToTarget(npc.queueTargetPosition, delta)

        if (arrived){
            npc.dirX = 0
            npc.dirY = 0
        }
    }
    
    exit(npc){
        console.log(`NPC ${npc.name} salió de la fila.`);
    }
}

class LeavingState extends State {

    constructor(){
        super()

        this.name = "leaving"
        this.debugColor = 0xff0000
    }

    enter(npc){

        npc.path = [...PATHS.restaurantExit]
        npc.currentWaypoint = 0
    }

    update(npc, delta){

        if (npc.currentWaypoint < npc.path.length){

            const target = npc.path[npc.currentWaypoint]

            const arrived = npc.moveToTarget(target, delta)

            if (arrived) npc.currentWaypoint++

            return
        }

        npc.dirX = npc.walkingDirection
        npc.dirY = 0

        npc.changeState(STATES.walking)

    }

    exit(npc){}
}

export const STATES = {
    walking: new WalkingState(),
    queue: new QueueState(),
    leaving: new LeavingState()
};

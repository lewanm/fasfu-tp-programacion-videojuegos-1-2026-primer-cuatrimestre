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
        // El estado se encarga de llamar al movimiento del NPC
        if(npc.dirX == 0 && npc.dirY == 0) {
            npc.dirX = npc.lastDir.x
            npc.dirY = npc.lastDir.y
        }
        npc.updateWalking(delta);
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
        console.log(`NPC ${npc.name} entró en la fila.`);
    }

    update(npc, delta){
        // Acá el estado controla al NPC mientras espera
        npc.updateQueue(delta);
    }
    
    exit(npc){
        console.log(`NPC ${npc.name} salió de la fila.`);
    }
}

// Exportamos las instancias únicas (Singletons)
export const STATES = {
    walking: new WalkingState(),
    queue: new QueueState()
};

window.states = STATES
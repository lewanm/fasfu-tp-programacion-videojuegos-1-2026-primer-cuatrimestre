class State {
    constructor(){
        this.debugColor = 0xffffff
    }

    enter(npc){}
    exit(npc){}
    update(npc, delta){}
}

class WalkingState extends State {
    constructor(){
        super()
    }

    enter(npc){
        //
    }

    update(npc, delta){
        npc.updateWalking(delta)
    }
}

class QueueState extends State {
    constructor(){
        super()
        this.debugColor = 0x00ff00
    }

    enter(npc){
        npc.dirX = 0
        npc.dirY = 0
    }

    update(npc, delta){
        npc.updateQueue(delta)
    }
}

export const STATES = {
    walking: new WalkingState(),
    queue: new QueueState()
}
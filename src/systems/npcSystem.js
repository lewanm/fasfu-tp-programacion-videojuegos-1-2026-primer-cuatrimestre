import { NPC } from "../entities/NPC.js";
import { getRandomInBetween } from "../utils/math.js";
import { isOutOfScreen } from "../utils/screen.js";
import { isInsideTrigger } from "../utils/trigger.js";
import { DOOR_TRIGGER } from "../world/triggers.js";

export function createNPCSystem(app, animations, colliders, screen){

    const NPCpool = []
    const container = new PIXI.Container()

    const width = screen.width
    const height = screen.height

    function init(poolSize = 5){
        for (let i = 0; i < poolSize; i++){

            const randomY = getRandomInBetween(280,340) //esto es para que spwneen abajo
            const npc = new NPC(animations, 0, randomY)

            npc.colliders = colliders
            npc.view.label = `npc_${i}`

            container.addChild(npc.view)
            NPCpool.push(npc)
        }
    }

    function getInactive(){
        return NPCpool.find(npc => !npc.active)
    }

    function spawn(){
        const npc = getInactive()
        if (!npc) return

        const spanwLeft = Math.random() < 0.5

        npc.reset(spanwLeft, width)
    }

    function update(delta){

        NPCpool.forEach(npc => {
            if (!npc.active) return

            npc.update(delta)

            npc.handleDoorTrigger(DOOR_TRIGGER)

            if (isOutOfScreen(npc, screen, 100)){
                npc.deactivate()
            }
        })

        spawn()
    }

    return {
        init,
        update,
        container,
        NPCpool
    }
}
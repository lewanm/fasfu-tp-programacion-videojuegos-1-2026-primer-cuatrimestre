import { NPC } from "../entities/NPC.js"
import { getRandomInBetween } from "../utils/math.js"
import { isOutOfScreen } from "../utils/screen.js"
import { DOOR_TRIGGER }  from "../world/triggers.js" //aca va a recibir despues todos los triggers juntos y revisar en la FSM por cada trigger
import { NPC_CONFIG } from "../config/gameConfig.js"

export function createNPCSystem(app, npcTypes, colliders, screen){

    const NPCpool = []
    window.npcs = NPCpool
    const container = new PIXI.Container()
    container.label = "NPCs"

    const width = screen.width
    const height = screen.height

    function init(poolSize = 5){
        for (let i = 0; i < poolSize; i++){

            const randomY = getRandomInBetween(280,340) //esto es para que spawneen abajo

            const keys = Object.keys(npcTypes)
            const randomKey = keys[Math.floor(Math.random() * keys.length)]
            const randomType = npcTypes[randomKey]

            const npc = new NPC(randomType, 0, randomY)
    
            npc.colliders = colliders
            npc.view.label = `${npc.name}`

            npc.view.visible = false

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
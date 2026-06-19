import { NPC } from "../entities/NPC.js"
import { getRandomInBetween } from "../utils/math.js"
import { isOutOfScreen } from "../utils/screen.js"
import { DOOR_TRIGGER }  from "../world/triggers.js" //aca va a recibir despues todos los triggers juntos y revisar en la FSM por cada trigger
import { NPC_CONFIG } from "../config/npcConfig.js"

export function createNPCSystem(colliders, screen, npcTypes){

    const NPCpool = []

    const container = new PIXI.Container()
    container.label = "NPCs"

    const width = screen.width
    const height = screen.height
    const typeKeys = Object.keys(npcTypes)

    async function init(){
        
        for (let i = 0; i < NPC_CONFIG.NPC_QUANTITY; i++){

            const randomType = getRandomNPCType()
            const initialPosition = {x: 0, y: getRandomInBetween(312,340)}//esto es para que spawneen abajo, despues ponerlo en NPC_CONFIG

            const npc = new NPC(randomType, initialPosition)
    
            npc.colliders = colliders
            npc.view.label = `${npc.name}`

            npc.view.visible = false

            container.addChild(npc.view)
            NPCpool.push(npc)
        }
    }
    

    function getRandomNPCType(){
        const randomKey = typeKeys[Math.floor(Math.random() * typeKeys.length)]
        return npcTypes[randomKey]
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
import { NPC } from "../entities/NPC.js"
import { getRandomInBetween } from "../utils/math.js"
import { isOutOfScreen } from "../utils/screen.js"
import { TRIGGERS }  from "../config/triggers.js" 
import { NPC_CONFIG } from "../config/npcConfig.js"
import { STATES } from "./states.js";
import { isInsideTrigger } from "../utils/trigger.js";

export function createNPCSystem(colliders, screen, npcTypes, queueSystem,keyboard){

    const NPCpool = []

    const container = new PIXI.Container()
    container.label = "NPCs"

    const width = screen.width
    const typeKeys = Object.keys(npcTypes)

    async function init(){
        
        for (let i = 0; i < NPC_CONFIG.NPC_QUANTITY; i++){

            const randomType = getRandomNPCType()
            const initialPosition = {x: 0, y: getRandomInBetween(NPC_CONFIG.minY,NPC_CONFIG.maxY)}//esto es para que spawneen abajo, despues ponerlo en NPC_CONFIG

            const npc = new NPC(randomType, initialPosition)
    
            npc.colliders = colliders
            npc.view.label = `${npc.name}`

            npc.respawnCooldown = getRandomInBetween(NPC_CONFIG.INITIAL_RESPAWN_MIN, NPC_CONFIG.INITIAL_RESPAWN_MAX)

            npc.view.visible = false

            container.addChild(npc.view)
            NPCpool.push(npc)
        }
    }
    
    function getRandomNPCType(){
        const randomKey = typeKeys[Math.floor(Math.random() * typeKeys.length)]
        return npcTypes[randomKey]
    }

    function updateInactiveNPC(npc, delta){
        if (!npc.updateCooldown(delta)) return

        const spawnLeft = Math.random() < 0.5

        npc.reset(spawnLeft, width)
    }

    function updateQueuedNPCs(){

        queueSystem.orderQueue.forEach(npc => {

            if (npc.isAtTargetPosition()){

                npc.faceDirection("left")
            }
        })

        queueSystem.waitingQueue.forEach(npc => {

            if (npc.isAtTargetPosition()){

                npc.faceDirection("left")
            }
        })
    }

    function tryEnterQueue(npc){

        const canEnterQueue =
                !npc.hasOrdered &&
                npc.isHungry() &&
                queueSystem.hasSpace() &&
                isInsideTrigger(
                    npc,
                    TRIGGERS.entrance
                )

            if (!canEnterQueue) return

            npc.hasEnteredDoor = true

            npc.changeState(STATES.queue)

            queueSystem.add(npc)
            
    }

    function tryDeactivate(npc){

        const out = isOutOfScreen(npc, screen, 100)

        if (!out) return

        npc.deactivate()
    }

    function update(delta){

        NPCpool.forEach(npc => {

            npc.update(delta)
            

            if (!npc.active) {
                updateInactiveNPC(npc, delta)
                return
            }

            tryEnterQueue(npc)

            tryDeactivate(npc)

        })

        updateQueuedNPCs()
    }

    return {
        init,
        update,
        container,
        NPCpool
    }
}
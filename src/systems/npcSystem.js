import { NPC } from "../entities/NPC.js"
import { getRandomInBetween } from "../utils/math.js"
import { isOutOfScreen } from "../utils/screen.js"
import { TRIGGERS }  from "../config/triggers.js" 
import { NPC_CONFIG } from "../config/npcConfig.js"
import { getRandomOrder } from "../utils/randomOrder.js"
import { getDebugInput } from "./debugInput.js"
import { STATES } from "./states.js";
import { isInsideTrigger } from "../utils/trigger.js";

export function createNPCSystem(colliders, screen, npcTypes, queueSystem,keyboard){

    const NPCpool = []

    const container = new PIXI.Container()
    container.label = "NPCs"

    const width = screen.width
    const height = screen.height
    const typeKeys = Object.keys(npcTypes)

    async function init(){
        
        for (let i = 0; i < NPC_CONFIG.NPC_QUANTITY; i++){

            const randomType = getRandomNPCType()
            const initialPosition = {x: 0, y: getRandomInBetween(NPC_CONFIG.minY,NPC_CONFIG.maxY)}//esto es para que spawneen abajo, despues ponerlo en NPC_CONFIG

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

            const canEnterQueue = 
                !npc.hasOrdered &&
                npc.isHungry() &&
                queueSystem.hasSpace() &&
                isInsideTrigger(npc, TRIGGERS.entrance)

            if (canEnterQueue){
                npc.hasEnteredDoor = true
                npc.changeState(STATES.queue)
                queueSystem.add(npc)
            }

            if (isOutOfScreen(npc, screen, 100)){
                npc.deactivate()
            }
        })

        // esto me gustaria moverlo a otra funcion
        const firstNpc = queueSystem.getFirst()
        const debugPressed = getDebugInput(keyboard)

        if (
            firstNpc &&
            !firstNpc.hasOrdered &&
            firstNpc.queueIndex === 0 &&
            firstNpc.isAtTargetPosition() && 
            queueSystem.hasWaitingSpace() &&
            debugPressed //obviamente quitar esto despues, seria para tomar el pedido mientras no pueda hacerlo el player
        ){

            firstNpc.order = getRandomOrder()

            firstNpc.hasOrdered = true

            console.log(`${firstNpc.name} pidió:`, firstNpc.order)

            queueSystem.moveToWaiting(firstNpc)
        }

        spawn()
    }

    return {
        init,
        update,
        container,
        NPCpool
    }
}
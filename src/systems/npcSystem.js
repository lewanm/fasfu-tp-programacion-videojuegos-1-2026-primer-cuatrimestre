import { NPC } from "../entities/NPC.js"
import { getRandomInBetween } from "../utils/math.js"
import { isOutOfScreen } from "../utils/screen.js"
import { TRIGGERS }  from "../config/triggers.js" 
import { NPC_CONFIG } from "../config/npcConfig.js"
import { STATES } from "./states.js";
import { isInsideTrigger } from "../utils/trigger.js";

export function createNPCSystem(colliders, screen, npcTypes, queueSystem, keyboard, orderBoard){

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
            npc.container.label = `${npc.name}`

            npc.respawnCooldown = getRandomInBetween(NPC_CONFIG.INITIAL_RESPAWN_MIN, NPC_CONFIG.INITIAL_RESPAWN_MAX)

            npc.view.visible = false

            container.addChild(npc.container)
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
                !npc.hasEnteredDoor &&
                isInsideTrigger(
                    npc,
                    TRIGGERS.entrance
                )

            if (!canEnterQueue) return

            npc.hasEnteredDoor = true

            npc.setPatience(NPC_CONFIG.MAX_PATIENCE)

            npc.changeState(STATES.queue)

            queueSystem.add(npc)
            
    }

    function tryDeactivate(npc){

        const out = isOutOfScreen(npc, screen, 100)

        if (!out) return

        npc.deactivate()
    }

    function updatePatience(npc, delta){

        const isWaitingCustomer = queueSystem.waitingQueue.includes(npc)

        const isFirstOrderingCustomer = queueSystem.getFirst() === npc

        npc.patienceBar.view.visible = isWaitingCustomer || isFirstOrderingCustomer

        if (!isWaitingCustomer && !isFirstOrderingCustomer) return

        if (!npc.isAtTargetPosition()) return

        npc.decreasePatience(delta)
    }

    function handleImpatientNPC(npc){

        if (npc.state !== STATES.queue) return

        if (!npc.hasLostPatience()) return

        queueSystem.remove(npc)
        queueSystem.removeWaiting(npc)

        if (npc.orderCard){
            
            orderBoard.remove(npc.orderCard)
            npc.orderCard = null
        }

        npc.hasEnteredDoor = true

        npc.patienceBar.view.visible = false

        npc.eat(NPC_CONFIG.NPC_MAX_HUNGER) //esto como para decir que se fue a otro local porque no lo atendienron y comio fuera

        console.log(`${npc.name} salió de la fila.`)

        npc.changeState(STATES.leaving)
    }

    function separateNPC(a, b){

        const aFeet = a.getFeetPosition()
        const bFeet = b.getFeetPosition()

        const dx = bFeet.x - aFeet.x
        const dy = bFeet.y - aFeet.y

        const distance = Math.hypot(dx, dy)

        const minDistance = a.radius + b.radius

        const predictionDistance = minDistance * 2

        if (distance === 0 || distance >= predictionDistance) return

        if (Math.abs(dx) < 2){

            const sideForce = 0.5

            if (Math.abs(dx) < 2){

                const sideForce = 0.5

                a.x -= sideForce
                b.x += sideForce
            }
            else if (Math.abs(dy) < 2){

                const sideForce = 0.5

                a.y -= sideForce
                b.y += sideForce
            }
        }

        const overlap = predictionDistance - distance

        const strength = overlap / predictionDistance

        const nx = dx / distance
        const ny = dy / distance

        a.pushWithCollision(-nx, -ny, strength)

        b.pushWithCollision(nx, ny, strength)
    }

    function updateSeparation(){

        for(let i = 0; i < NPCpool.length; i++){

            const a = NPCpool[i]

            if (!a.active) continue

            for(let j = i + 1; j < NPCpool.length; j++){

                const b = NPCpool[j]

                if (!b.active) continue

                separateNPC(a, b)
            }
        }
    }

    function handleStuckNPC(npc){

        if (npc.state !== STATES.walking) return

        if (!npc.isStuck()) return

        console.log(`${npc.name} estaba trabado`)

        npc.stuckTime = 0

        npc.pushWithCollision(0, 1, NPC_CONFIG.STUCK_FORCE)
    }

    function update(delta){

        NPCpool.forEach(npc => {

            npc.update(delta)

            
            
            if (!npc.active) {
                updateInactiveNPC(npc, delta)
                return
            }

            updatePatience(npc, delta)

            handleImpatientNPC(npc)

            handleStuckNPC(npc)

            tryEnterQueue(npc)

            tryDeactivate(npc)

        })
        updateSeparation()
        
        updateQueuedNPCs()
    }

    return {
        init,
        update,
        container,
        NPCpool
    }
}
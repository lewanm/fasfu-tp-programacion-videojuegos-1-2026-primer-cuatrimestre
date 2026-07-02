import { createDebugSystem } from "./debugRenderer.js"
import { DEBUG_OPTIONS } from "../config/debugConfig.js"
import { TRIGGERS } from "../config/triggers.js"

export function createGameDebug(app, player, npcSystem, colliders, worldObjects, queueSystem){

    if (!DEBUG_OPTIONS.enabled) return null

    const debug = createDebugSystem(app, true)

    const debugEntities = []

    function getAllTriggers(){
        const triggers = []

        //los triggers de los objetos
        worldObjects.objects.forEach(obj => {
            const trigger = obj.getTriggerBounds?.()
            if (trigger) triggers.push(trigger)
        })

        for (const trigger in TRIGGERS){
            triggers.push(TRIGGERS[trigger])
        }

        return triggers
    }

    if (DEBUG_OPTIONS.colliders) {
        debug.drawColliders(colliders)
    }

    if (DEBUG_OPTIONS.triggers) {
        const triggers = getAllTriggers()
        triggers.forEach(trigger => debug.drawTrigger(trigger))
    }

    if (DEBUG_OPTIONS.playerHitbox) {
        debugEntities.push(debug.drawHitbox(player))
    }

    if (DEBUG_OPTIONS.queueWaypoints){

        debug.drawPath(queueSystem.queueEntryPath)

        queueSystem.queueEntryPath.forEach(point => {
            debug.drawWaypoint(point)
        });
    }

    if (DEBUG_OPTIONS.queuePositions){

        const allPositions = [...queueSystem.queuePositions, ...queueSystem.waitingPositions]
        allPositions.forEach(point => {
            debug.drawQueuePosition(point);
        });

    }

    npcSystem.NPCpool.forEach(npc => {

        if (DEBUG_OPTIONS.npcHitboxes) {
            debugEntities.push(debug.drawHitbox(npc))
        }

        if (DEBUG_OPTIONS.npcState) {
            debugEntities.push(debug.drawEntityState(npc))
        }
    })

    return {
        update(){
            debugEntities.forEach(entity => entity.update())
        }
    }
}
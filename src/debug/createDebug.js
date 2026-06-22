import { createDebugSystem } from "./debugRenderer.js"
import { DEBUG_OPTIONS } from "../config/debugConfig.js"
import { DOOR_TRIGGER } from "../world/triggers.js"

export function createGameDebug(app, player, npcSystem, colliders, worldObjects){

    if (!DEBUG_OPTIONS.enabled) return null

    const debug = createDebugSystem(app, true)

    const debugEntities = []

    function getAllTriggers(){
        const triggers = []

        worldObjects.objects.forEach(obj => {
            const trigger = obj.getTriggerBounds?.()
            if (trigger) triggers.push(trigger)
        })

        //agrego manualmente los globales
        triggers.push(DOOR_TRIGGER)

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
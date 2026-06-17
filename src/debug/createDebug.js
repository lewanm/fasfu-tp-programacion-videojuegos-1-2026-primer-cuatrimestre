import { createDebugSystem } from "./debugRenderer.js"
import { DEBUG_OPTIONS } from "../config/debugConfig.js"
import { DOOR_TRIGGER } from "../world/triggers.js"

export function createGameDebug(app, player, npcSystem, colliders){

    if (!DEBUG_OPTIONS.enabled) return null

    const debug = createDebugSystem(app, true)

    const debugEntities = []

    if (DEBUG_OPTIONS.colliders) {
        debug.drawColliders(colliders)
    }

    if (DEBUG_OPTIONS.triggers) {
        debug.drawTrigger(DOOR_TRIGGER)
    }

    if (DEBUG_OPTIONS.playerHitbox) {
        debugEntities.push(debug.drawHitbox(player))
    }

    console.log(npcSystem.NPCpool)
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
import { loadCharacterAnimations } from "../assets/loadCharacterAnimations.js"
import { NPC_TYPES } from "../config/npcConfig.js"

export async function createNPCTypes(){

    const npcEntries = Object.entries(NPC_TYPES)
    const npcTypes = {}

    for (const [id, config] of npcEntries){

        const animations = await loadCharacterAnimations(config.asset);

        npcTypes[id] = {
            id,
            animations,
            options: config.options
        };
    }

    return npcTypes
}
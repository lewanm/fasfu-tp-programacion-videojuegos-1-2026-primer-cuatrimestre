import { getCharacterAnimations } from "../assets/getCharacterAnimations.js"
import { NPC_TYPES } from "../config/npcConfig.js"

export async function createNPCTypes(){

    const npcEntries = Object.entries(NPC_TYPES)
    const npcTypes = {}

    for (const [id, config] of npcEntries){

        if (!config.asset) {
            throw new Error(`No se encontró el asset para el NPC con id: ${id}`);
        }

        const animations = await getCharacterAnimations(config.asset);

        npcTypes[id] = {
            id,
            animations,
            options: config.options
        };
    }

    return npcTypes
}
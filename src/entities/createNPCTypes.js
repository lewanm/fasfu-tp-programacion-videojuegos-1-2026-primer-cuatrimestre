import { loadCharacterAnimations } from "../assets/loadCharacterAnimations.js"
import { ASSETS } from "../config/assets.js"

export async function createNPCTypes(){

    const npcEntries = Object.entries(ASSETS.NPCS)

    const allNPCsAnimations = {}

    for (const [characterId, jsonPath] of npcEntries) {
        const animations = await loadCharacterAnimations(jsonPath)
        allNPCsAnimations[characterId] = animations
    }

    return allNPCsAnimations
}
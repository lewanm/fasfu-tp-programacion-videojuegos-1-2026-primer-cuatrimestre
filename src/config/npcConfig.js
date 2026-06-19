import { ASSETS } from "./assets.js"

export const NPC_CONFIG = {
    SPEED: 1.5,
    INITIAL_HUNGER_MIN : 0,
    INITIAL_HUNGER_MAX : 50,
    HUNGER_RATE: 0.02,
    NPC_QUANTITY: 5
}
    
export const NPC_TYPES = {
    NPC_01: {
        asset: ASSETS.NPCS.NPC_01,

        options: {
            hitboxOffset: { x: 2, y: 8 },
            width: 20,
            height: 22
        }
    },
    NPC_02: {
        asset: ASSETS.NPCS.NPC_02,

        options: {
            hitboxOffset: { x: 2, y: 8 },
            width: 20,
            height: 22
        }
    },
}


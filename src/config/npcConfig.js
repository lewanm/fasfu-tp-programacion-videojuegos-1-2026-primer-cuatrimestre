import { ASSETS } from "./assets.js"

export const NPC_CONFIG = {
    SPEED: 1.5,
    INITIAL_HUNGER_MIN : 30,
    INITIAL_HUNGER_MAX : 50,
    HUNGER_RATE: 0.02,
    NPC_QUANTITY: 15,
    minY: 550,
    maxY: 680
}

const DEFAULT_OPTIONS = {
        hitboxOffset: {x: 1, y: 20},
        width: 28,
        height: 32
}
    
export const NPC_TYPES = {

    NPC_01: {
        asset: ASSETS.NPCS.NPC_01,
        options: DEFAULT_OPTIONS
    },

    NPC_02: {
        asset: ASSETS.NPCS.NPC_02,
        options: DEFAULT_OPTIONS
    },

    NPC_03: {
        asset: ASSETS.NPCS.NPC_03,
        options: DEFAULT_OPTIONS
    },

    NPC_04: {
        asset: ASSETS.NPCS.NPC_04,
        options: DEFAULT_OPTIONS
    },

    NPC_05: {
        asset: ASSETS.NPCS.NPC_05,
        options: DEFAULT_OPTIONS
    },

    NPC_06: {
        asset: ASSETS.NPCS.NPC_06,
        options: DEFAULT_OPTIONS
    },

    NPC_07: {
        asset: ASSETS.NPCS.NPC_07,
        options: DEFAULT_OPTIONS
    },

    NPC_08: {
        asset: ASSETS.NPCS.NPC_08,
        options: DEFAULT_OPTIONS
    },

    NPC_09: {
        asset: ASSETS.NPCS.NPC_09,
        options: DEFAULT_OPTIONS
    },

    NPC_10: {
        asset: ASSETS.NPCS.NPC_10,
        options: DEFAULT_OPTIONS
    },

    NPC_11: {
        asset: ASSETS.NPCS.NPC_11,
        options: DEFAULT_OPTIONS
    },

    NPC_12: {
        asset: ASSETS.NPCS.NPC_12,
        options: DEFAULT_OPTIONS
    },

    NPC_13: {
        asset: ASSETS.NPCS.NPC_13,
        options: DEFAULT_OPTIONS
    }
}
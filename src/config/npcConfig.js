import { ASSETS } from "./assets.js"

export const NPC_CONFIG = {
    NPC_QUANTITY: 20,
    SPEED: 2.5,
    INITIAL_HUNGER_MIN : 0,
    INITIAL_HUNGER_MAX : 70,
    RESPAWN_MIN : 12,
    RESPAWN_MAX : 60,
    INITIAL_RESPAWN_MIN : 4,
    INITIAL_RESPAWN_MAX : 48,
    HUNGER_RATE: 0.03,
    HUNGER_RESET_CHANCE: 0.55,
    REDUCE_HUNGER: 0.7,
    NPC_MAX_HUNGER: 150,
    MAX_PATIENCE: 100,
    PATIENCE_RATE: 0.05,
    minY: 550,
    maxY: 680,
    RADIUS: 7,
    RADIUS_OFFSET: 28,
    STUCK_TIME: 5,
    STUCK_FORCE: 20
    
}

//si quisiera modificar algun NPC porque es mas grande o mas chico, podria cambiar options en el creado de NPCs, pero meh
const DEFAULT_OPTIONS = {
        hitboxOffset: {x: 1, y: 8},
        width: 16,
        height: 18
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
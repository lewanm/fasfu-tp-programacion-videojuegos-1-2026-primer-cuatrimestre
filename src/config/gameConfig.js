export const GAME = {
    WIDTH: 640,
    HEIGHT: 360,
    BACKGROUND_COLOR: 0x444444,
    DEBUG_MODE: false,
}

export const NPC_CONFIG = {
    SPEED: 1.5,
    INITIAL_HUNGER_MIN : 0,
    INITIAL_HUNGER_MAX : 50,
    HUNGER_RATE: 0.02,
    NPC_QUANTITY: 5
}

export const PLAYER = {
    SPEED: 2.5,
    SIZE: 32,
    COLOR: 0x0000AA,
    INITIAL_POSITION: {
        x: 330,
        y: 160
    }, //estos 3 son para la hitbox
    HITBOX_Y_OFFSET: 3,
    WIDTH: 12,
    HEIGHT: 18,
    TEXTURE: "./src/assets/characters/16x32-walk-sheet.png"
}

export const WORLD = {
    TILE_SIZE: 32,
}

export const KITCHEN = {
    x: 83,
    y: 122,
    width: 281,
    height: 118,
}

export const INPUT = {
    UP: ["KeyW", "ArrowUp"],
    LEFT: ["KeyA", "ArrowLeft"],
    DOWN: ["KeyS", "ArrowDown"],
    RIGHT: ["KeyD", "ArrowRight"]
}
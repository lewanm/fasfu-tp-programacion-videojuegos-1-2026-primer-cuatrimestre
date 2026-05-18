export const GAME = {
    WIDTH: 640,
    HEIGHT: 360,
    BACKGROUND_COLOR: 0x444444,
    DEBUG_MODE: false,
    HITBOX_Y_OFFSET: 3
}

export const PLAYER = {
    SPEED: 2.5,
    SIZE: 32,
    COLOR: 0x0000AA,
    INITIAL_POSITION: {
        x: 330,
        y: 160
    }
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
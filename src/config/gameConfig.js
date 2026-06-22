import { ASSETS } from "../config/assets.js"

export const GAME = {
    WIDTH: 640,
    HEIGHT: 360,
    BACKGROUND_COLOR: 0x444444,
}

export const PLAYER = {
    SPEED: 2.5,
    SIZE: 32,
    COLOR: 0x0000AA,
    ASSET:ASSETS.PLAYER,
    INITIAL_POSITION: {
        x: 330,
        y: 160
    }, //estos 3 son para la hitbox
    OPTIONS: {
            hitboxOffset: {x: 2, y: 8},
            width: 20,
            height: 22
    }
}

export const WORLD = {
    TILE_SIZE: 32,
}

export const INPUT = {
    UP: ["KeyW", "ArrowUp"],
    LEFT: ["KeyA", "ArrowLeft"],
    DOWN: ["KeyS", "ArrowDown"],
    RIGHT: ["KeyD", "ArrowRight"],

    ACTION: ["KeyE"]
}
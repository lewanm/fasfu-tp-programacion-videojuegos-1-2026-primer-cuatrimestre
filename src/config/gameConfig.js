import { ASSETS } from "./assets.js"

export const GAME = {
    WIDTH: 1280,
    HEIGHT: 720,
    BACKGROUND_COLOR: 0x444444,
}

export const PLAYER = {
    SPEED: 3,
    SIZE: 32,
    COLOR: 0x0000AA,
    ASSET:ASSETS.PLAYER,
    INITIAL_POSITION: {
        x: 430,
        y: 300
    }, //estos 3 son para la hitbox
    OPTIONS: {
            hitboxOffset: {x: 1, y: 24},
            width: 22,
            height: 22
    }
}

export const WORLD = {
    TILE_SIZE: 32
}

export const INPUT = {
    UP: ["KeyW", "ArrowUp"],
    LEFT: ["KeyA", "ArrowLeft"],
    DOWN: ["KeyS", "ArrowDown"],
    RIGHT: ["KeyD", "ArrowRight"],

    ACTION: ["KeyE", "Enter"],
    RETURN: ["Escape"],

    DEBUG: ["KeyG"],
}
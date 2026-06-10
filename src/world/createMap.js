import { GAME } from "../config/gameConfig.js"

export async function createMap(screen){
    const texture = await PIXI.Assets.load("/assets/images/map.png")

    const sprite = new PIXI.Sprite(texture)

    sprite.label = "map"
    sprite.width = GAME.WIDTH
    sprite.height = GAME.HEIGHT

    return sprite
}
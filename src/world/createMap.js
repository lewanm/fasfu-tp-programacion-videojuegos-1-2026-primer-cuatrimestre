import { GAME } from "../config/gameConfig.js"
import { ASSETS } from "../config/assets.js"

export async function createMap(screen){
    const texture = await PIXI.Assets.load(ASSETS.MAP)

    const sprite = new PIXI.Sprite(texture)

    sprite.label = "map"
    sprite.width = GAME.WIDTH
    sprite.height = GAME.HEIGHT

    return sprite
}
import { Player } from "./player.js"
import { createAtlas } from "../assets/atlas/playerAtlas.js"
import { createAnimations } from "../systems/animationSystem.js"
import { PLAYER } from "../config/gameConfig.js"

//poner como parametro
export async function createPlayer(){

    const texture = await PIXI.Assets.load(PLAYER.TEXTURE)
    const frames = createAtlas(texture)
    const animations = createAnimations(frames)

    const player = new Player(animations, 
        {
            hitboxOffsetY: PLAYER.HITBOX_Y_OFFSET,
            width: PLAYER.WIDTH,
            height: PLAYER.HEIGHT
        }
    )

    return player
}
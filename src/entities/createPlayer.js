import { Player } from "/src/entities/player.js"
import { PLAYER } from "../config/gameConfig.js"
import { loadCharacterAnimations } from "../assets/loadCharacterAnimations.js"
import { ASSETS } from "../config/assets.js"

//poner como parametro
export async function createPlayer(){

    const animations = await loadCharacterAnimations(ASSETS.PLAYER, "player")

    const player = new Player(animations, 
        {
            hitboxOffset: {
                x: PLAYER.HITBOX_X_OFFSET,
                y: PLAYER.HITBOX_Y_OFFSET
            },
            width: PLAYER.WIDTH,
            height: PLAYER.HEIGHT
        }
    )

    return player
}
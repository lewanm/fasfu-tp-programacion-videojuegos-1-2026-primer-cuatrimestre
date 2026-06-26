import { Player } from "/src/entities/player.js"
import { PLAYER } from "../config/gameConfig.js"
import { getCharacterAnimations } from "../assets/getCharacterAnimations.js"

//poner como parametro
export async function createPlayer(worldObjects){

    const animations = await getCharacterAnimations(PLAYER.ASSET)

    const player = new Player(animations, PLAYER.OPTIONS)
    player.colliders = worldObjects 

    return player
}
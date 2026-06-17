import { Player } from "/src/entities/player.js"
import { PLAYER } from "../config/gameConfig.js"
import { loadCharacterAnimations } from "../assets/loadCharacterAnimations.js"

//poner como parametro
export async function createPlayer(worldObjects){

    const animations = await loadCharacterAnimations(PLAYER.ASSET, "player")

    const player = new Player(animations, PLAYER.OPTIONS)
    player.colliders = worldObjects 

    return player
}
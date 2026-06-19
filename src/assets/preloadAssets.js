import { ASSETS } from "../config/assets.js"

export async function preloadAssets(){

    const npcPaths = Object.values(ASSETS.NPCS)
    const staticObjects = Object.values(ASSETS.STATIC_OBJECTS)

    await PIXI.Assets.load([
        ASSETS.PLAYER,
        ASSETS.MAP,
        ... npcPaths,
        ... staticObjects
    ])
}
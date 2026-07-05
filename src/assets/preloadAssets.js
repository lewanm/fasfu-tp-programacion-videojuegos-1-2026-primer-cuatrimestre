import { ASSETS } from "../config/assets.js"

export async function preloadAssets(){

    const npcPaths = Object.values(ASSETS.NPCS)
    const staticObjects = Object.values(ASSETS.STATIC_OBJECTS)
    const mapAssets = Object.values(ASSETS.MAP)
    const props = Object.values(ASSETS.PROPS)

    await PIXI.Assets.load([
        ASSETS.PLAYER,
        ...mapAssets,
        ...npcPaths,
        ...staticObjects,
        ...props,
    ])
}
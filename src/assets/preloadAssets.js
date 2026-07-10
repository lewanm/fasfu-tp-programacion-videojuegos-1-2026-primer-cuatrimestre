import { ASSETS } from "../config/assets.js"

export async function preloadAssets(){

    const assets = getAssetsPaths(ASSETS)

    await PIXI.Assets.load(assets)
}

export function getAssetsPaths(obj){

    const paths = []

    Object.values(obj).forEach(value => {
        if(typeof value === "string"){
            paths.push(value)
            return
        }

        if(typeof value === "object" && value !== null){
            paths.push(...getAssetsPaths(value))
        
        } 
    })

    return paths

}
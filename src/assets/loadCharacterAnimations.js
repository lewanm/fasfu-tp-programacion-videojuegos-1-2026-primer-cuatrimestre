const cache = new Map()

export async function loadCharacterAnimations(jsonPath){

    if(cache.has(jsonPath)){
        return cache.get(jsonPath)
    }

    const sheet = await PIXI.Assets.load(jsonPath)
    const textures = sheet.textures

    const animations = {
        down: [
            textures["down_0"],
            textures["down_1"],
            textures["down_2"],
            textures["down_3"],
        ],        up: [
            textures["up_0"],
            textures["up_1"],
            textures["up_2"],
            textures["up_3"],
        ],
        right: [
            textures["right_0"],
            textures["right_1"],
            textures["right_2"],
            textures["right_3"],
        ],
        idle: [textures["down_0"]]
    }

    cache.set(jsonPath, animations)

    return animations
}
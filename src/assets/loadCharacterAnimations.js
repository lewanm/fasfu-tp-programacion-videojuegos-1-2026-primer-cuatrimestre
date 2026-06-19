export async function loadCharacterAnimations(jsonPath){

    const sheet = await PIXI.Assets.get(jsonPath)
    
    if (!sheet) {
            throw new Error(`Asset no cargado: ${jsonPath}`);
    }

    const animations = sheet.animations
    
    return animations
}
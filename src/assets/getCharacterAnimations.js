export function getCharacterAnimations(jsonPath){

    if (!jsonPath) {
        throw new Error("No se proporcionó la ruta del asset JSON.");
    }

    const sheet = PIXI.Assets.get(jsonPath)
    
    if (!sheet) {
            throw new Error(`Asset no cargado: ${jsonPath}`);
    }
    
    return sheet.animations
}
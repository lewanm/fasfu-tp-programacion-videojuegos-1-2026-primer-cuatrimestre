import { INPUT } from "../config/gameConfig.js"

let wasPressed = false

export function getInteractionInput(keyboard){
    const isPressed = keyboard.isPressed(INPUT.ACTION)
    //esto es pa no spamear la E manteniendolo apretado
    const justPressed = isPressed && !wasPressed

    wasPressed = isPressed

    return justPressed
}
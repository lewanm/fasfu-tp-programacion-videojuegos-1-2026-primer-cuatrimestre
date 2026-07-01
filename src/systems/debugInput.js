import { INPUT } from "../config/gameConfig.js"

let wasPressed = false

export function getDebugInput(keyboard){

    const isPressed = keyboard.isPressed(INPUT.DEBUG)

    const justPressed = isPressed && !wasPressed

    wasPressed = isPressed

    return justPressed
}
import { INPUT } from "../config/gameConfig.js"

export function getMovementInput(keyboard){
    let x = 0
    let y = 0

    if(keyboard.isPressed(INPUT.UP)) y = -1
    if(keyboard.isPressed(INPUT.LEFT)) x = -1
    if(keyboard.isPressed(INPUT.DOWN)) y = 1
    if(keyboard.isPressed(INPUT.RIGHT)) x = 1
    
    return {x,y}
}
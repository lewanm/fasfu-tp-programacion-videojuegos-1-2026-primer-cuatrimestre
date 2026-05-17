export function createPlayerAnimations(frames){
    return {
        //obviamente tendriamos que tener todos los atlas/spritesheet del mismo tipo
        down: frames.slice(0,4),
        right: frames.slice(8,12),
        up: frames.slice(16,20)
    }
}
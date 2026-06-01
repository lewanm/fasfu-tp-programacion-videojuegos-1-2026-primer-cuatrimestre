export function getRandomInBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

export function normalize(x,y){
    const length = Math.hypot(x,y)

    if (length === 0){
        return {x:0, y:0}
    }

    return {
        x : x / length,
        y : y / length
    }
}
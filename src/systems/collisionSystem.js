export function isColliding(a,b){
    if (!a.width || !a.height || !b.width || !b.height) {
        return false
    }
    return(
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    )
}
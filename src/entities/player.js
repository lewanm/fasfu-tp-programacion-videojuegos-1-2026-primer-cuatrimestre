import { Character } from "./Character.js"
import { PLAYER } from "../config/gameConfig.js"

export class Player extends Character{

    constructor(animations){
        super(animations)
        this.speed = PLAYER.SPEED
    }

    update(delta){
        let dx = this.dirX
        let dy = this.dirY

        const lenght = Math.hypot(dx, dy)

        if (lenght > 0){
            dx /= lenght
            dy /= lenght
        }

        this.x += dx * this.speed * delta
        this.y += dy * this.speed * delta

        this.view.x = this.x
        this.view.y = this.y

        this.updateAnimation(delta)
    }
}
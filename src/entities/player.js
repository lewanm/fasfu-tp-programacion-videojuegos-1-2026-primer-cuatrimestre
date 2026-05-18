import { Character } from "./Character.js"
import { PLAYER } from "../config/gameConfig.js"

export class Player extends Character{

    constructor(animations){
        super(animations)
        this.speed = PLAYER.SPEED
        this.x = PLAYER.INITIAL_POSITION.x
        this.y = PLAYER.INITIAL_POSITION.y
    }

    update(delta){
        let dx = this.dirX
        let dy = this.dirY

        const lenght = Math.hypot(dx, dy)

        if (lenght > 0){
            dx /= lenght
            dy /= lenght
        }

        this.moveWithCollision(dx, dy, this.speed, delta)

        this.view.x = this.x
        this.view.y = this.y

        this.updateAnimation(delta)
    }
}
import { Character } from "./Character.js"
import { PLAYER } from "../config/gameConfig.js"
import { normalize } from "../utils/math.js"

export class Player extends Character{

    constructor(animations, options){
        super(animations, options)
        this.speed = PLAYER.SPEED
        this.x = PLAYER.INITIAL_POSITION.x
        this.y = PLAYER.INITIAL_POSITION.y
    }

    update(delta){

        const { x: dx, y: dy } = normalize(this.dirX, this.dirY)

        this.moveWithCollision(dx, dy, this.speed, delta)

        this.view.x = this.x
        this.view.y = this.y

        this.updateAnimation(delta)
    }
}
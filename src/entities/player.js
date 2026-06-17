import { Character } from "./Character.js"
import { PLAYER } from "../config/gameConfig.js"
import { normalize } from "../utils/math.js"

export class Player extends Character{

    constructor(animations, options){
        super(animations, options)
        this.speed = PLAYER.SPEED
        this.x = PLAYER.INITIAL_POSITION.x
        this.y = PLAYER.INITIAL_POSITION.y
        this.view.label = "Player"
    }

    

    update(delta){

        const { x: dx, y: dy } = normalize(this.dirX, this.dirY)

        this.moveWithCollision(dx, dy, delta)

        this.updateAnimation()

        super.update(delta); 
    }
}
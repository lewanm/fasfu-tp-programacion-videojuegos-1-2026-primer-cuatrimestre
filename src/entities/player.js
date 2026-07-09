import { Character } from "./character.js"
import { PLAYER } from "../config/gameConfig.js"
import { normalize } from "../utils/math.js"

export class Player extends Character{

    constructor(animations, options){
        super(animations, options)

        this.speed = PLAYER.SPEED
        this.x = PLAYER.INITIAL_POSITION.x
        this.y = PLAYER.INITIAL_POSITION.y

        this.view.label = "Player"
        
        this.heldItem = null
    }

    
    receiveItem(item){
        if (this.heldItem){
            console.log("Ya tenes un item")
            return false
        }

        this.heldItem = item
        console.log(`Recibió item: ${item.type} (${item.state || item.variant})`)
        return true
    }

    removeItem(){
        const item = this.heldItem
        this.heldItem = null
        return item
    }

    getHeldItemKey(){
        if (!this.heldItem) return "empty"

        const {type, state, variant} = this.heldItem
        
        if (state){
            return `${type}_${state}`
        }

        if (variant) {
            return `${type}_${variant}`
        }

        return type
    }

    //overide del metodo para que pueda cambiar de animacion dependiendo del item.
    getCurrentAnimationKey(direction){
        const itemKey = this.getHeldItemKey()

        if (itemKey === "empty") 
            return `walking_${direction}`

        return `${itemKey}_${direction}`
    }
    

    update(delta){

        const { x: dx, y: dy } = normalize(this.dirX, this.dirY)

        this.moveWithCollision(dx, dy, delta)

        this.updateAnimation()

        super.update(delta); 
    }
}
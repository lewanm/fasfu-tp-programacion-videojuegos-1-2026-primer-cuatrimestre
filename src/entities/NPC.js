import { Character } from "./Character.js";
import { normalize } from "../utils/math.js";
import { isInsideTrigger } from "../utils/trigger.js";
import { getRandomInBetween } from "../utils/math.js";
import { NPC_CONFIG } from "../config/gameConfig.js";
import { STATES } from "../systems/states.js";

const NPC_OFFSET = 0 //para modificar la hitbox

export class NPC extends Character{
    constructor(animations, initialX = 0, initialY = 0){
        super(animations)
        this.name = `NPC_${Math.floor(Math.random() * 1000)}`
        this.state = 

        this.speed = NPC_CONFIG.SPEED

        this.x = initialX
        this.y = initialY

        this.active = false

        this.hasEnteredDoor = false

        this.hunger = getRandomInBetween(NPC_CONFIG.INITIAL_HUNGER_MIN, NPC_CONFIG.INITIAL_HUNGER_MAX)
    }

    reset(spawnLeft, gameWidth){
        if(spawnLeft){
            this.x = -NPC_OFFSET
            this.dirX = 1
        } else {
            this.x = gameWidth + NPC_OFFSET
            this.dirX = -1
        }

        this.dirY = 0

        this.state = "walking"
        this.hasEnteredDoor = false

        this.activate()
    }

    activate(){
        this.active = true
        this.view.visible = true
    }

    deactivate(){
        this.active = false
        this.view.visible = false
    }

    increaseHunger(delta){
        this.hunger += NPC_CONFIG.HUNGER_RATE * delta

        if (this.hunger > 100) this.hunger = 100
    }

    eat(amount){
        this.hunger -= amount
        if (this.hunger < 0) this.hunger = 0
    }

    isHungry(){
        return this.hunger > 50
    }

    updateWalking(delta){
        const { x: dx, y: dy } = normalize(this.dirX, this.dirY)

        this.moveWithCollision(dx, dy, this.speed, delta)

        this.view.x = this.x
        this.view.y = this.y

        this.updateAnimation(delta)
    }

    updateQueue(delta){
        //placeholder
        this.dirX = 0
        this.dirY = 0
    }

    
    changeState(newState){
        this.state?.exit?.(this)
        this.state = newState
        this.state?.enter?.(this)
    }

    enterState(state){

        if (state === "queue"){
            this.dirX = 0
            this.dirY = 0

            console.log("NPC entro en la fila")
        }

        if (state === "walking"){
            console.log("NPC empezo a caminar")
        }
    }

    handleDoorTrigger(trigger){
        if (this.hasEnteredDoor) return

        if (!isInsideTrigger(this, trigger)) return

        this.hasEnteredDoor = true

        console.log(`NPC ${this.name} llego a la puerta, su hambre es: ${this.hunger}`)

        if (this.isHungry()){
            this.changeState("queue")
        }
    }

    update(delta){

        if (!this.active) return

        this.increaseHunger(delta)

        STATES[this.state].update(this, delta)
    }

}

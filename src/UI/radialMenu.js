import { INPUT } from "../config/gameConfig.js"

export class RadialMenu {
    constructor(){
        this.isOpen = false
        
        this.options = {
            up: null,
            right: null,
            down: null,
            left: null,
        }

        this.selectedDirection = null
    }

    open(options){
        this.options = options
        this.selecedDirection = null
        this.isOpen = true
    }

    close(){
        this.selectedDirection = null
        this.isOpen = false
    }

    select(direction){
        const item = this.options[direction]
        if(!item) return

        this.selectedDirection = direction
        return true
    }

    confirm(){
        if(!this.selectedDirection) return null

        return this.options[this.selectedDirection]
    }

    selectFromKey(code){
        const directionMap = {
            keyW: "up",
            keyS: "down",
            keyA: "left",
            keyD: "right"
        }

        const direction = directionMap[code]

        if(!direction) return false

        return this.select(direction)
    }

    handleInput(keyboard){
        if(!this.isOpen) return 

        if(keyboard.isPressed(INPUT.UP)) this.select("up")
        if(keyboard.isPressed(INPUT.RIGHT)) this.select("right")
        if(keyboard.isPressed(INPUT.DOWN)) this.select("down")
        if(keyboard.isPressed(INPUT.LEFT)) this.select("left")

    }
}


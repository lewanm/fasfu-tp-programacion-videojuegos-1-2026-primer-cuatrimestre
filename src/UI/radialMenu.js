import { INPUT } from "../config/gameConfig.js"
import { ASSETS } from "../config/assets.js"

export class RadialMenu {
    constructor(){
        const topTexture = PIXI.Assets.get(ASSETS.UI.topRadial)
        const rightTexture = PIXI.Assets.get(ASSETS.UI.rightRadial)
        const bottomTexture = PIXI.Assets.get(ASSETS.UI.bottomRadial)
        const leftTexture = PIXI.Assets.get(ASSETS.UI.leftRadial)

        const offset = 55
        this.container = new PIXI.Container()
        this.container.label = "radialMenu"
        this.container.visible = false
        this.container.zIndex = 1900

        this.onConfirm = null

        this.slots = {
            up: this.createSlot(topTexture),
            right: this.createSlot(rightTexture),
            down: this.createSlot(bottomTexture),
            left: this.createSlot(leftTexture)
        }

        this.slots.up.container.y = - offset
        this.slots.right.container.x = offset
        this.slots.down.container.y = offset
        this.slots.left.container.x = - offset

        Object.entries(this.slots).forEach(([key, slot]) => {
            slot.container.label = `radialSlot_${key}`
            this.container.addChild(slot.container)
        })

        this.isOpen = false
        
        this.options = {
            up: null,
            right: null,
            down: null,
            left: null,
        }

        this.selectedDirection = null
    }

    createSlot(texture){
        const container = new PIXI.Container()
        const background = new PIXI.Sprite(texture)
        background.anchor.set(0.5)
        
        const item = new PIXI.Sprite()
        item.anchor.set(0.5)
        item.visible = false

        container.addChild(background)
        container.addChild(item)

        return {
            container,
            background: background,
            item
        }
    }

    updateVisuals(){
        Object.entries(this.options).forEach(([direction, item]) => {

            const slot = this.slots[direction]

            if (!item){

                slot.item.visible = false

                return
            }

            slot.item.texture = PIXI.Assets.get(item.asset)

            slot.item.visible = true
        })
    }

    updateSelectionVisuals(){

        Object.entries(this.slots).forEach(([direction, slot]) => {

            const item = this.options[direction]

            if (!item){

                slot.container.tint = 0x222222
                slot.container.alpha = 1
                return
            }

            // Slot seleccionado
            if (direction === this.selectedDirection){
                slot.item.alpha = 1
                slot.background.alpha = 1
                slot.background.tint = 0xffffff
                return
            }

            // Slot disponible
            slot.background.tint = 0x777777
            slot.item.alpha = 0.75

        })
    }

    resetVisuals(){
        Object.values(this.slots).forEach(slot => {
            slot.container.tint = 0xffffff
            slot.container.alpha = 1
            slot.item.tint = 0xffffff
            slot.item.alpha = 1
            slot.background.tint = 0xffffff
            slot.background.alpha = 1
        })
    }

    open(options, onConfirm = null){
        this.resetVisuals()
        this.options = options
        this.onConfirm = onConfirm
        this.selectedDirection = null

        this.updateVisuals()
        this.updateSelectionVisuals()

        this.isOpen = true
        this.container.visible = true
    }

    close(){
        this.selectedDirection = null
        this.onConfirm = null
        this.isOpen = false
        this.container.visible = false
    }

    select(direction){
        const item = this.options[direction]

        if(!item) return false

        this.selectedDirection = direction
        this.updateSelectionVisuals()

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

        if(keyboard.wasPressed(INPUT.UP)) this.select("up")
        if(keyboard.wasPressed(INPUT.RIGHT)) this.select("right")
        if(keyboard.wasPressed(INPUT.DOWN)) this.select("down")
        if(keyboard.wasPressed(INPUT.LEFT)) this.select("left")
        if(keyboard.wasPressed(INPUT.ACTION)) this.confirmAction()
        if(keyboard.wasPressed(INPUT.RETURN)) this.close()
    }

    confirmAction(){
        const item = this.confirm()
        if(!item) return
        this.onConfirm?.(item)
        this.close()
    }

    update(player){
        if(!this.isOpen) return

        this.container.x = player.x
        this.container.y = player.y - 20 // no quise ponerlo en otro lado, es pa que no quede centrado
    }
}


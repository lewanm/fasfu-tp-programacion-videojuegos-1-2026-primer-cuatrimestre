import { GAME, INPUT } from "../config/gameConfig.js"


export class TutorialOverlay {

    constructor(textures){

        this.container = new PIXI.Container()
        this.container.label = "Tutorial"
        //this.container.scale.set(1.01)
        this.container.zIndex = 2500
        this.container.x = -1

        this.pages = textures

        this.currentPage = 0

        this.isOpen = true

        this.sprite = new PIXI.Sprite(textures[0])
        this.sprite.width = GAME.WIDTH
        this.sprite.height = GAME.HEIGHT

        this.container.addChild(this.sprite)

        this.skipText = new PIXI.Text({
            text: "ESC - Saltear tutorial",
            style: {
                fill: 0xffffff,
                fontSize: 20,
                stroke: {
                    color: 0x000000,
                    width: 4
                }
            }
        })

        this.navigationText = new PIXI.Text({
            text: "← Página anterior    |    Página siguiente →",
            style: {
                fill: 0xffffff,
                fontSize: 20,
                stroke: {
                    color: 0x000000,
                    width: 4
                }
            }
        })

        this.skipText.x = 20
        this.skipText.y = 20

        this.navigationText.anchor.set(0.5, 0)
        this.navigationText.x = GAME.WIDTH / 2
        this.navigationText.y = 20

        this.container.addChild(this.skipText)
        this.container.addChild(this.navigationText)

        this.updatePage()
    }

    updatePage(){

        this.sprite.texture = this.pages[this.currentPage]

        const isFirstPage = this.currentPage === 0

        const isLastPage = this.currentPage === this.pages.length - 1

        let text = ""

        if (!isFirstPage) text += "← Página anterior"
        
        if (!isFirstPage && !isLastPage) text += "    |    "

        if (!isLastPage) text += "Página siguiente →"

        if (isLastPage) text = "E - Comenzar"

        this.navigationText.text = text
    }


    previousPage(){

        if (this.currentPage <= 0)
            return

        this.currentPage--

        this.updatePage()
    }

    nextPage(){

        if (
            this.currentPage >=
            this.pages.length - 1
        ){
            return
        }

        this.currentPage++

        this.updatePage()
    }

    close(){

        this.isOpen = false

        this.container.visible = false
    }

    handleInput(keyboard){

        if (keyboard.wasPressed(INPUT.LEFT)) this.previousPage()
    
        if (keyboard.wasPressed(INPUT.RIGHT)) this.nextPage()
        if (keyboard.wasPressed(INPUT.RETURN)) this.close()

        const isLastPage = this.currentPage === this.pages.length - 1

        if (isLastPage && keyboard.wasPressed(INPUT.ACTION)) this.close()
    }

}
import { GAME, INPUT } from "../config/gameConfig.js"

export class SplashScreen {

    constructor(backgroundTexture, pressEnterTexture, logoTexture){

        this.isOpen = true

        this.container = new PIXI.Container()

        this.container.label = "SplashScreen"
        this.container.zIndex = 2600

        this.background = new PIXI.Sprite(backgroundTexture)

        this.background.width = GAME.WIDTH
        this.background.height = GAME.HEIGHT

        this.pressEnter = new PIXI.Sprite(pressEnterTexture)

        this.pressEnter.anchor.set(0.5)

        this.pressEnter.x = GAME.WIDTH / 2
        this.pressEnter.y = GAME.HEIGHT - 120

        this.logo = new PIXI.Sprite(logoTexture)

        this.logo.anchor.set(0.5)

        this.logo.x = GAME.WIDTH / 2
        this.logo.y = (GAME.HEIGHT / 4)

        this.container.addChild(this.background)
        this.container.addChild(this.pressEnter)
        this.container.addChild(this.logo)
    }

    close(){

        this.isOpen = false

        this.container.visible = false
    }

    handleInput(keyboard){

        if (keyboard.wasPressed(INPUT.ACTION)) return true

        return false
    }

    update(delta){

        const alpha = 0.5 + Math.sin(performance.now() * 0.005) * 0.5

        this.pressEnter.alpha = alpha
    }
}
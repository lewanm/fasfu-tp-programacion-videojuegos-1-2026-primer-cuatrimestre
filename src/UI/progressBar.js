export class ProgressBar {

    constructor({
        width = 20,
        height = 3,
        color = 0x00ff00,
        backgroundTexture = null,
        fillTexture = null
    } = {}) {

        this.progress = 0

        if (backgroundTexture && fillTexture) {

            this.view = new PIXI.Container()
            this.view.zIndex = 2000

            this.background = new PIXI.Sprite(PIXI.Assets.get(backgroundTexture))

            this.fill = new PIXI.Sprite(PIXI.Assets.get(fillTexture))

            this.background.anchor.set(0, 0.5)
            this.background.x = -this.background.width / 2 - 2
            this.background.y = this.background.height / 2

            this.fill.anchor.set(0, 0.5)
            this.fill.x = -this.fill.width / 2
            this.fill.y = this.background.height / 2

            this.view.addChild(this.background)
            this.view.addChild(this.fill)

            this.isSpriteBar = true

        } else {

            this.view = new PIXI.Graphics()

            this.width = width
            this.height = height
            this.color = color

            this.isSpriteBar = false
        }
    }

    setProgress(value){

        this.progress = Math.max(0, Math.min(1, value))

        if (this.isSpriteBar){

            this.fill.scale.x = this.progress

            return
        }

        this.draw()
    }

    draw(){

        const g = this.view

        g.clear()

        g.rect(
            -this.width / 2,
            0,
            this.width,
            this.height
        )

        g.fill({
            color: 0x000000,
            alpha: 0.4
        })

        g.rect(
            -this.width / 2,
            0,
            this.width * this.progress,
            this.height
        )

        g.fill({
            color: this.color
        })
    }
}
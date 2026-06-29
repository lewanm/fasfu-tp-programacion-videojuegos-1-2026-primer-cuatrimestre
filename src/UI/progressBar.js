export class ProgressBar {

    constructor({ width = 20, height = 3, color = 0x00ff00 } = {}) {

        this.view = new PIXI.Graphics();
        this.width = width
        this.height = height
        this.color = color

        this.progress = 0
    }

    setProgress(value) {
        this.progress = Math.max(0, Math.min(1, value))
        this.draw()
    }

    draw() {
        const g = this.view

        g.clear()

        // fondo
        g.rect(-this.width / 2, 0, this.width, this.height)
        g.fill({ color: 0x000000, alpha: 0.4 })

        // progreso
        g.rect(-this.width / 2, 0, this.width * this.progress, this.height)
        g.fill({ color: this.color })
    }
}
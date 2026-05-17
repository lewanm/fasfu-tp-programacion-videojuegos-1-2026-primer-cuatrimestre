import { PLAYER } from "../config/gameConfig.js"

export function createPlayer(animations){

    const view = new PIXI.Sprite(animations.down[0])
    view.label = "player"
    view.anchor.set(0.5, 0.5);

    const player = {
        currentAnimation: animations.down,
        frameIndex: 0,
        animationTimer: 0,
        x: 0,
        y: 0,
        dirX: 0,
        dirY: 0,
        speed:  PLAYER.SPEED,
        view,

        frameIndex: 0,

        update(delta){
            let dx = this.dirX
            let dy = this.dirY

            const length = Math.hypot(dx, dy)

            if(length > 0){
                dx /= length
                dy /= length
            }

            this.x += dx * this.speed * delta
            this.y += dy * this.speed * delta

            view.x = this.x
            view.y = this.y
 
            if (Math.abs(this.dirX) > Math.abs(this.dirY)) {
                this.currentAnimation = this.dirX > 0 ? animations.right : animations.left;
            } else if (this.dirY !== 0) {
                this.currentAnimation = this.dirY > 0 ? animations.down : animations.up;
            } else {
                this.currentAnimation = animations.idle ?? animations.down;
            }

            
            if (length > 0) {
                this.animationTimer += delta;

                if (this.animationTimer > 6) {
                    this.animationTimer = 0;
                    this.frameIndex++;

                    if (this.frameIndex >= this.currentAnimation.length) {
                        this.frameIndex = 0;
                    }

                    this.view.texture = this.currentAnimation[this.frameIndex];
                }
            }

            if (this.dirX > 0) {
                this.view.scale.x = 1;
            } else if (this.dirX < 0) {
                this.view.scale.x = -1;
            }

        }

        
    }

    player.update(1)
    return player;
}
export class Character{
    constructor(animations){
        this.animations = animations
        
        this.view = new PIXI.Sprite(animations.down[0])
        this.view.anchor.set(0.5, 0.5)

        this.x = 0
        this.y = 0

        this.dirX = 0
        this.dirY = 0

        this.currentAnimation = animations.down
        this.frameIndex = 0
        this.animationTimer = 0
    }
    
    updateAnimation(delta){
        const length = Math.hypot(this.dirX, this.dirY)

        let newAnimation = this.currentAnimation

        if (Math.abs(this.dirX) > Math.abs(this.dirY)) {
            newAnimation = this.animations.right;
        } else if (this.dirY !== 0) {
            newAnimation = this.dirY > 0 ? this.animations.down : this.animations.up
        }

        //cambio de animacion
        if (newAnimation && this.currentAnimation !== newAnimation) {
            this.currentAnimation = newAnimation
            this.frameIndex = 0
            this.animationTimer = 0
            this.view.texture = this.currentAnimation[0];
        }

        //flip horizontal
        if (this.dirX !== 0) {
            this.view.scale.x = this.dirX > 0 ? 1 : -1;
        }

        
        if (length > 0) {
            this.animationTimer += delta

            if (this.animationTimer > 6) {
                this.animationTimer = 0;
                this.frameIndex++

                if (this.frameIndex >= this.currentAnimation.length) {
                    this.frameIndex = 0
                }

                this.view.texture = this.currentAnimation[this.frameIndex]
            }
        }
    }
};
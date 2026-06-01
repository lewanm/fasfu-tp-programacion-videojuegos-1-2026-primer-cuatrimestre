import { isColliding } from "../systems/collisionSystem.js"

export class Character{
    constructor(animations, options = {}){
        this.animations = animations
        
        this.view = new PIXI.Sprite(animations.down[0])
        this.view.anchor.set(0.5, 0.5)

        this.x = 0
        this.y = 0

        this.dirX = 0
        this.dirY = 0

        this.speed = 0

        //para la hitbox
        this.width = options.width ?? 12
        this.height = options.height ?? 18

        this.hitboxOffsetY = options.hitboxOffsetY ?? 3

        this.colliders = []

        this.currentAnimation = animations.down
        this.frameIndex = 0
        this.animationTimer = 0
    }

    getBounds(x = this.x, y = this.y){
        return {
            x: x - this.width / 2,
            y: y + this.hitboxOffsetY - this.height / 2,
            width: this.width,
            height: this.height
        };
    }

    collides(bounds){
        return this.colliders.some(collider => isColliding(bounds, collider))
    }
       
    moveWithCollision(dx, dy, speed, delta){
        const nextX = this.x + dx * speed * delta;
        const nextY = this.y + dy * speed * delta;

        const boundsX = this.getBounds(nextX, this.y)

        const collidesX = this.colliders.some(collider => isColliding(boundsX, collider))

        if (!this.collides(boundsX)) {
            this.x = nextX
        }


        const boundsY = this.getBounds(this.x, nextY)

        const collidesY = this.colliders.some(collider => isColliding(boundsY, collider))

        if (!this.collides(boundsY)) {
            this.y = nextY
        }
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
        if (this.currentAnimation !== newAnimation) {
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

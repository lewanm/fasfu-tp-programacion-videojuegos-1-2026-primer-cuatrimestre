import { Entity } from "./Entity.js"
import { isColliding } from "../systems/collisionSystem.js"

export class Character extends Entity {

    constructor(animations, options = {}) { 
        // Inicializamos el AnimatedSprite con la animación por defecto (down)
        const view = new PIXI.AnimatedSprite(animations.down);
        
        super(view);

        this.animations = animations;

        // Configuraciones nativas de PixiJS (autoUpdate queda en true por defecto)
        this.view.animationSpeed = 0.15; // TODO: Mover a gameConfig.js en el futuro
        this.view.anchor.set(0.5, 0.5);
        this.view.gotoAndStop(0); // Nacen quietos en el frame inicial (Idle)

        this.dirX = 0;
        this.dirY = 0;
        this.speed = 0;

        // Configuración de la Hitbox para las colisiones
        this.width = options.width ?? 12;
        this.height = options.height ?? 18;
        this.hitboxOffset = options.hitboxOffset ?? {x: 0, y: 0};

        this.colliders = [];

        this.currentAnimation = animations.down;
        
        // FLAG CLAVE: Guarda el estado de movimiento del frame anterior para detectar cambios
        this.isCurrentlyMoving = false; 
    }

    getBounds(x = this.x, y = this.y) {
        return {
            x: x + this.hitboxOffset.x - this.width / 2, //este en realidad seria lo ideal que el sprite este centrado, pero por ahora
            y: y + this.hitboxOffset.y - this.height / 2,
            width: this.width,
            height: this.height
        };
    }

    collides(bounds) {
        return this.colliders.some(collider => isColliding(bounds, collider));
    }
        
    moveWithCollision(dx, dy, delta) {
        const nextX = this.x + dx * this.speed * delta;
        const nextY = this.y + dy * this.speed * delta;

        // Eje X
        const boundsX = this.getBounds(nextX, this.y);
        if (!this.collides(boundsX)) {
            this.x = nextX;
        }

        // Eje Y
        const boundsY = this.getBounds(this.x, nextY);
        if (!this.collides(boundsY)) {
            this.y = nextY;
        }
    }

    updateAnimation() {
        // 1. Evaluamos el estado de movimiento actual según las direcciones lógicas
        const isMovingNow = this.dirX !== 0 || this.dirY !== 0;
        let targetAnimation = this.currentAnimation;

        if (isMovingNow) {
            // Determinar qué animación usar según la dirección predominante (Ángulos top-down)
            if (Math.abs(this.dirX) > Math.abs(this.dirY)) {
                targetAnimation = this.animations.right;
            } else if (this.dirY !== 0) {
                targetAnimation = this.dirY > 0 ? this.animations.down : this.animations.up;
            }
        }

        // 2. ¿CAMBIÓ LA DIRECCIÓN? (Giro del personaje)
        if (this.currentAnimation !== targetAnimation) {
            this.currentAnimation = targetAnimation;
            this.view.textures = targetAnimation; // Cambiamos el set de texturas en Pixi
            
            // Si se está moviendo al girar, forzamos a reiniciar el bucle de caminata
            if (isMovingNow) {
                this.view.gotoAndPlay(0); 
            }
        }

        // 3. ¿CAMBIÓ EL ESTADO DE MOVIMIENTO? (Caminar <-> Frenar)
        if (this.isCurrentlyMoving !== isMovingNow) {
            this.isCurrentlyMoving = isMovingNow; // Sincronizamos el flag
            
            if (isMovingNow) {
                if (!this.view.playing) this.view.play();
            } else {
                // Al detenerse lógicamente, mandamos al sprite al cuadro estático de forma nativa
                this.view.gotoAndStop(0); 
            }
        }

        // 4. Control del Espejado (Flip Horizontal)
        if (this.currentAnimation === this.animations.right && this.dirX !== 0) {
            this.view.scale.x = this.dirX > 0 ? 1 : -1;
        } else if (this.currentAnimation !== this.animations.right) {
            this.view.scale.x = 1; // Reseteamos la escala para las animaciones Up y Down
        }
    }

    update(delta) {
        // Primero resolvemos cómo queda la animación tras los movimientos del frame
        this.updateAnimation();
        
        // Sincronizamos las coordenadas X e Y lógicas con la posición en pantalla de PixiJS
        this.updateTransform();
    }
}
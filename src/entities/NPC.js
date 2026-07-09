import { Character } from "./character.js";
import { normalize } from "../utils/math.js";
import { getRandomInBetween } from "../utils/math.js";
import { NPC_CONFIG } from "../config/npcConfig.js";
import { STATES } from "../systems/states.js";

const NPC_OFFSET = 0;

export class NPC extends Character {
    constructor(type, initialPosition = {}) {
        super(type.animations,type.options);

        this.type = type

        this.name = `NPC_${Math.floor(Math.random() * 1000)}`;
        this.speed = NPC_CONFIG.SPEED;

        this.x = initialPosition.x ?? 0;
        this.y = initialPosition.y ?? 0;

        this.active = false;
        this.lastDir = {x: 0, y: 0}
        this.walkingDirection = 1
        
        this.state = null; 
        this.hasEnteredDoor = false;

        this.order = null
        this.hasOrdered = false

        this.path = []
        this.currentWaypoint = 0

        this.queueIndex = -1
        this.queueTargetPosition = null

        this.hunger = getRandomInBetween(NPC_CONFIG.INITIAL_HUNGER_MIN, NPC_CONFIG.INITIAL_HUNGER_MAX);
    }

    reset(spawnLeft, gameWidth) {
        if (spawnLeft) {
            this.x = -NPC_OFFSET
            this.dirX = 1
            this.walkingDirection = 1
        } else {
            this.x = gameWidth + NPC_OFFSET
            this.dirX = -1
            this.walkingDirection = -1
        }

        this.dirY = 0

        this.lastDir = {
            x: this.dirX,
            y: this.dirY
        }

        this.hasEnteredDoor = false;

        this.idleDirection = null

        this.order = null
        this.hasOrdered = false

        this.path = []
        this.currentWaypoint = 0

        this.queueIndex = -1
        this.queueTargetPosition = null

        // CAMBIO 2: Usamos el método formal para inicializar el estado al resetear
        this.changeState(STATES.walking)
        this.activate()
    }

    activate() {
        this.active = true;
        this.view.visible = true;
        this.view.play()
    }

    deactivate() {
        this.active = false;
        this.view.visible = false;
        this.view.stop(); // Buenas prácticas: si se va al pool, que no gaste CPU animándose
    }

    // CAMBIO 3: Máquina de estados formal (FSM) con Enter y Exit
    changeState(nextState) {
        if (this.state === nextState) return;

        // 1. Ejecutamos la salida del estado actual (si existe)
        if (this.state && typeof this.state.exit === "function") {
            this.state.exit(this);
        }

        // 2. Cambiamos la referencia al nuevo objeto estado
        this.state = nextState;

        // 3. Ejecutamos la entrada del nuevo estado
        if (this.state && typeof this.state.enter === "function") {
            this.state.enter(this);
        }
    }

    isHungry() {
        return this.hunger > 50;
    }

    increaseHunger(delta) {
        this.hunger += NPC_CONFIG.HUNGER_RATE * delta;
        if (this.hunger > 100) this.hunger = 100;
    }

    eat(amount) {
        this.hunger -= amount;
        if (this.hunger < 0) this.hunger = 0;
    }

    moveToTarget(target, delta){
        const dx = target.x - this.x;
        const dy = target.y - this.y;

        const distance = Math.hypot(dx, dy);

        if (distance < 2){
            return true;
        }

        const dir = normalize(dx, dy);

        this.dirX = dir.x;
        this.dirY = dir.y;

        this.moveWithCollision(
            dir.x,
            dir.y,
            delta
        );

        return false;
    }

    isAtTargetPosition(){

        if (!this.queueTargetPosition) return false;

        const dx = this.queueTargetPosition.x - this.x;
        const dy = this.queueTargetPosition.y - this.y;

        return Math.hypot(dx, dy) < 5;
    }

    update(delta) {
        if (!this.active) return;

        this.increaseHunger(delta);

        this.state.update(this, delta);

        super.update(delta); 
    }
}
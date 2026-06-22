import { Character } from "./Character.js";
import { normalize } from "../utils/math.js";
import { isInsideTrigger } from "../utils/trigger.js";
import { getRandomInBetween } from "../utils/math.js";
import { NPC_CONFIG } from "../config/npcConfig.js";
import { STATES } from "../systems/states.js"; // Importamos las instancias de los estados

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
        
        this.state = STATES.walking; 
        this.hasEnteredDoor = false;

        this.hunger = getRandomInBetween(NPC_CONFIG.INITIAL_HUNGER_MIN, NPC_CONFIG.INITIAL_HUNGER_MAX);
    }

    reset(spawnLeft, gameWidth) {
        if (spawnLeft) {
            this.x = -NPC_OFFSET;
            this.dirX = 1;
        } else {
            this.x = gameWidth + NPC_OFFSET;
            this.dirX = -1;
        }
        this.dirY = 0;
        this.hasEnteredDoor = false;

        // CAMBIO 2: Usamos el método formal para inicializar el estado al resetear
        this.changeState(STATES.walking);
        this.activate();
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

    handleDoorTrigger(trigger) {
        if (this.hasEnteredDoor) return;
        if (!isInsideTrigger(this, trigger)) return;

        this.hasEnteredDoor = true;
     
        if (this.isHungry()) {
            // CAMBIO 4: Pasamos el objeto de estado de la fila
            this.changeState(STATES.queue); 
        }
    }

    // CAMBIO 5: Unificado y centralizado
    update(delta) {
        if (!this.active) return;

        this.increaseHunger(delta);

        // Ejecuta el update del objeto estado actual (WalkingState o QueueState)
        this.state.update(this, delta);

        // Delegamos TODA la actualización de físicas finales, posiciones de la vista 
        // y control reactivo de la animación nativa de PixiJS a la clase padre (Character)
        super.update(delta); 
    }

    eat(amount) {
        this.hunger -= amount;
        if (this.hunger < 0) this.hunger = 0;
    }

    // Métodos internos que llaman los estados correspondientes
    updateWalking(delta) {
        const { x: dx, y: dy } = normalize(this.dirX, this.dirY);
        this.moveWithCollision(dx, dy, delta);
    }

    updateQueue(delta) {
        // Por ahora se queda quieto en su lugar. 
        // El enter() del QueueState ya puso dirX y dirY en 0.
    }
}
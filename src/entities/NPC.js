import { Character } from "./character.js";
import { normalize } from "../utils/math.js";
import { getRandomInBetween } from "../utils/math.js";
import { NPC_CONFIG } from "../config/npcConfig.js";
import { STATES } from "../systems/states.js";
import { ProgressBar } from "../UI/progressBar.js";
import { ASSETS } from "../config/assets.js";

const NPC_OFFSET = 0;

export class NPC extends Character {
    constructor(type, initialPosition = {}) {
        super(type.animations,type.options);

        this.type = type
        
        this.name = `NPC_${Math.floor(Math.random() * 1000)}`;
        this.speed = NPC_CONFIG.SPEED;
        
        this.x = initialPosition.x ?? 0;
        this.y = initialPosition.y ?? 0;
        
        this.active = false
        this.patience = NPC_CONFIG.MAX_PATIENCE
        this.respawnCooldown = 0
        this.lastDir = {x: 0, y: 0}
        this.walkingDirection = 1
        
        this.state = null;
        this.hasEnteredDoor = false

        this.radius = NPC_CONFIG.RADIUS // pa las colisiones entre NPC
        
        this.order = null
        this.orderCard = null
        this.hasOrdered = false

        this.path = []
        this.currentWaypoint = 0

        this.queueIndex = -1
        this.queueTargetPosition = null

        this.stuckTime = 0
        this.lastPosition = {x: 0, y: 0}

        this.hunger = getRandomInBetween(NPC_CONFIG.INITIAL_HUNGER_MIN, NPC_CONFIG.INITIAL_HUNGER_MAX);
    
        this.patienceBar = new ProgressBar({
            backgroundTexture:
                ASSETS.HUD.clientPatienceBarFrame,

            fillTexture:
                ASSETS.HUD.clientPatienceBarFill
        })
        this.patienceBar.setProgress(1)
        this.patienceBar.view.visible = false
        this.patienceBar.view.y = -50
        this.container.addChild(this.patienceBar.view)

    
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

        this.respawnCooldown = 0

        this.order = null
        this.orderCard = null
        this.hasOrdered = false

        this.stuckTime = 0
        this.lastPosition = {x: 0, y: 0}

        this.path = []
        this.currentWaypoint = 0

        this.queueIndex = -1
        this.queueTargetPosition = null

        this.changeState(STATES.walking)
        this.activate()
    }

    activate() {
        this.active = true;
        this.view.visible = true;
        this.view.play()
    }

    deactivate() {
        this.active = false
        this.respawnCooldown = getRandomInBetween(NPC_CONFIG.RESPAWN_MIN, NPC_CONFIG.RESPAWN_MAX)
        this.view.visible = false
        this.view.stop()
        //hago que su hambre baje a la mitad con 50% a si no llega al punto que todos tienen mucha hambre, o por lo menos no tan rapido
        if(Math.random() > NPC_CONFIG.HUNGER_RESET_CHANCE){
            this.hunger *= NPC_CONFIG.REDUCE_HUNGER
        }
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
        return this.hunger > NPC_CONFIG.NPC_MAX_HUNGER / 2;
    }

    eat(amount) {
        this.hunger -= amount;
        if (this.hunger < 0) this.hunger = 0;
    }

    getFeetPosition(){
        return {
            x: this.x,
            y: this.y + NPC_CONFIG.RADIUS_OFFSET
        }
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

    increaseHunger(delta) {
        const mutiplier = this.active ? 1 : 0.5
        this.hunger += NPC_CONFIG.HUNGER_RATE * delta * mutiplier
        if (this.hunger > NPC_CONFIG.NPC_MAX_HUNGER) this.hunger = NPC_CONFIG.NPC_MAX_HUNGER
    }

    setPatience(amount){
        this.patience = Math.max(0,Math.min(amount, NPC_CONFIG.MAX_PATIENCE))
        this.updatePatienceBar()
    }

    increasePatience(amount){
        
        this.patience += amount

        if (this.patience > NPC_CONFIG.MAX_PATIENCE){
            this.patience = NPC_CONFIG.MAX_PATIENCE
        }

        this.updatePatienceBar()
    }

    decreasePatience(delta){
        this.patience -= delta * NPC_CONFIG.PATIENCE_RATE

        if (this.patience < 0){
            this.patience = 0
        }

        this.updatePatienceBar()
    }

    hasLostPatience(){
        return this.patience <= 0
    }

    updateCooldown(delta){
        if(this.active) return false

        this.respawnCooldown -= delta / 15

        return this.respawnCooldown <= 0
    }

    updatePatienceBar(){
        const ratio = this.patience / NPC_CONFIG.MAX_PATIENCE

        this.patienceBar.setProgress(ratio)

        //this.patienceBar.setProgress(ratio)

        //this.patienceBar.view.visible = this.patience < NPC_CONFIG.MAX_PATIENCE
    
    }

    updateStuck(delta){

        const movedDistance = Math.hypot(
            this.x - this.lastPosition.x,
            this.y - this.lastPosition.y
        )

        if (movedDistance < 2) this.stuckTime += delta

        else {

            this.stuckTime = 0

            this.lastPosition.x = this.x
            this.lastPosition.y = this.y
        }
    }

    isStuck(){
        return this.stuckTime > NPC_CONFIG.STUCK_TIME
    }

    update(delta) {
        this.increaseHunger(delta)

        this.updateStuck(delta)
        
        if (!this.active) return

        this.state.update(this, delta)

        super.update(delta)
    }
}
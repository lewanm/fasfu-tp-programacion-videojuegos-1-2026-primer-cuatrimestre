import { GAME, NPC_CONFIG } from "./config/gameConfig.js"
import { Player } from "./entities/player.js";
import { createKeyboard } from "./systems/keyboard.js";
import { getMovementInput } from "./systems/movementInput.js";
import { WORLD_OBJECTS } from "./world/worldObjects.js";
import { createNPCSystem } from "./systems/npcSystem.js";
import { createMap } from "./world/createMap.js";
import { createPlayer } from "./entities/createPlayer.js";
import { createGameDebug } from "./debug/createDebug.js";
import { createNPCTypes } from "./entities/createNPCTypes.js";

export async function createGame() {
    const app = new PIXI.Application()
    
    await app.init({
        width: GAME.WIDTH,
        height: GAME.HEIGHT,
        backgroundColor: GAME.BACKGROUND_COLOR
    })

    //##### ASSETS #####

    const mapSprite = await createMap(app.screen)

    //##### PLAYER #####

    const player = await createPlayer()
    player.colliders = WORLD_OBJECTS // ver si lo paso por parametros en createPlayer

    const keyboard = createKeyboard()

    //##### NPCs #####
    
    
    const npcTypes = await createNPCTypes()
    const npcSystem = createNPCSystem(
        app, 
        npcTypes,
        WORLD_OBJECTS, 
        app.screen
    )

    npcSystem.init(NPC_CONFIG.NPC_QUANTITY)

    //##### SCENES #####
    app.stage.addChild(mapSprite)
    app.stage.addChild(npcSystem.container)
    app.stage.addChild(player.view)

    const debug = createGameDebug(app, player, npcSystem)

    //##### GAME LOOP #####
    function update(delta){
        const input = getMovementInput(keyboard) // pasar esto al player directamente

        player.dirX = input.x
        player.dirY = input.y

        player.update(delta)

        npcSystem.update(delta)
        
       debug?.update()
    }

    app.ticker.add((ticker) => {
        update(ticker.deltaTime)
    })

    return app
}

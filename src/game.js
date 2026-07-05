import { GAME } from "./config/gameConfig.js"
import { createKeyboard } from "./systems/keyboard.js";
import { getMovementInput } from "./systems/movementInput.js";
import { createNPCSystem } from "./systems/npcSystem.js";
import { createMap } from "./world/createMap.js";
import { createPlayer } from "./entities/createPlayer.js";
import { createGameDebug } from "./debug/createDebug.js";
import { createWorldObjects } from "./world/createWorldObjects.js"
import { WALLS } from "./config/worldObjects.js";
import { createNPCTypes } from "./entities/createNPCTypes.js";
import { preloadAssets } from "./assets/preloadAssets.js";
import { createInteractionSystem } from "./systems/interactionSystem.js";
import { createQueueSystem } from "./systems/queueSystem.js";

export async function createGame() {
    const app = new PIXI.Application()
    window.app = app

    await app.init({
        width: GAME.WIDTH,
        height: GAME.HEIGHT,
        backgroundColor: GAME.BACKGROUND_COLOR
    })

    //##### ASSETS #####
    
    await preloadAssets()
    const map = await createMap(app.screen)
    const worldObjects = await createWorldObjects()

    //##### COLLIDERS #####

    const colliders = [
        ... WALLS,
        ... worldObjects.objects
            .filter(obj => obj.isSolid)
            .map(obj => obj.getBounds())
    ]

    //##### PLAYER #####

    const player = await createPlayer(colliders)

    const keyboard = createKeyboard()

    //aca se cotnrola el player
    const interactionSystem = createInteractionSystem(player, worldObjects, keyboard)
    
    //##### NPCs #####
    
    const queueSystem = createQueueSystem() 

    const npcTypes = await createNPCTypes()
    
    const npcSystem = createNPCSystem(
        colliders, 
        app.screen,
        npcTypes,
        queueSystem,
        keyboard // esto solo lo estoy pasando a modo de debug para probar algunas cosas.
    )

    await npcSystem.init()

    //##### SCENES #####
    app.stage.addChild(map)
    app.stage.addChild(worldObjects.container)
    app.stage.addChild(npcSystem.container)
    app.stage.addChild(player.view)

    const debug = createGameDebug(
        app, 
        player, 
        npcSystem, 
        colliders, 
        worldObjects,
        queueSystem,
    ) //aca se agrega en el stage al contenedor de debug
    // para ver en consola
    
    window.debug = {
        player: player,
        npcs: npcSystem.NPCpool,
        activeNPCs: ()=> npcSystem.NPCpool.filter(npc => npc.active),
        colliders: colliders,
        worldObjects: worldObjects.objects,
        queueSystem: queueSystem,
        map: map
    }
    //##### GAME LOOP #####
    function update(delta){
        const input = getMovementInput(keyboard) // pasar esto al player directamente o ver que ondeu

        interactionSystem.update()

        player.dirX = input.x
        player.dirY = input.y

        player.update(delta)

        npcSystem.update(delta)
        
        worldObjects.update(delta)

        debug?.update()        
    }

    app.ticker.add((ticker) => {
        update(ticker.deltaTime)
    })

    return app
}


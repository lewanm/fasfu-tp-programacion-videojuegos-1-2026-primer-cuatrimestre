import { GAME } from "./config/gameConfig.js"
import { createKeyboard } from "./systems/keyboard.js";
import { getMovementInput } from "./systems/movementInput.js";
import { createNPCSystem } from "./systems/npcSystem.js";
import { createMap } from "./world/createMap.js";
import { createPlayer } from "./entities/createPlayer.js";
import { createGameDebug } from "./debug/createDebug.js";
import { createWorldObjects } from "./world/createWorldObjects.js"
import { WALLS } from "./world/worldObjects.js";

export async function createGame() {
    const app = new PIXI.Application()
    window.app = app

    await app.init({
        width: GAME.WIDTH,
        height: GAME.HEIGHT,
        backgroundColor: GAME.BACKGROUND_COLOR
    })

    //##### ASSETS #####

    const mapSprite = await createMap(app.screen)
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

    //##### NPCs #####
    
    
    const npcSystem = createNPCSystem(
        colliders, 
        app.screen
    )

    await npcSystem.init()

    //##### SCENES #####
    app.stage.addChild(mapSprite)
    app.stage.addChild(npcSystem.container)
    app.stage.addChild(player.view)
    app.stage.addChild(worldObjects.container)

    const debug = createGameDebug(app, player, npcSystem, colliders) //aca se agrega en el stage al contenedor de debuf
    // para ver en consola
    window.debug = {
        player: player,
        npcs: npcSystem.NPCpool
    }
    //##### GAME LOOP #####
    function update(delta){
        const input = getMovementInput(keyboard) // pasar esto al player directamente o ver que ondeu

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

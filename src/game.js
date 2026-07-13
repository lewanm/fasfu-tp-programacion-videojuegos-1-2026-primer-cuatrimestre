import { GAME } from "./config/gameConfig.js"
import { createKeyboard } from "./systems/keyboard.js"
import { getMovementInput } from "./systems/movementInput.js"
import { createNPCSystem } from "./systems/npcSystem.js"
import { createMap } from "./world/createMap.js"
import { createPlayer } from "./entities/createPlayer.js"
import { createGameDebug } from "./debug/createDebug.js"
import { createWorldObjects } from "./world/createWorldObjects.js"
import { WALLS } from "./config/worldObjects.js"
import { createNPCTypes } from "./entities/createNPCTypes.js"
import { preloadAssets } from "./assets/preloadAssets.js"
import { createInteractionSystem } from "./systems/interactionSystem.js"
import { createQueueSystem } from "./systems/queueSystem.js"
import { createOrderSystem } from "./systems/orderSystem.js"
import { RadialMenu } from "./UI/radialMenu.js"
import { INPUT } from "./config/gameConfig.js"
import { ITEMS } from "./config/items.js" //esto lo dejo solo para exponer en debug
import { getAssetsPaths } from "./assets/preloadAssets.js"
import { ASSETS } from "./config/assets.js"
import { OrderCard } from "./UI/orderCard.js"
import { OrderBoard } from "./UI/orderBoard.js"


export async function createGame() {
    const app = new PIXI.Application()
    window.app = app

    await app.init({
        width: GAME.WIDTH,
        height: GAME.HEIGHT,
        backgroundColor: GAME.BACKGROUND_COLOR
    })

    app.stage.sortableChildren = true

    //##### ASSETS #####
    
    await preloadAssets()

    const map = await createMap(app.screen)
    const worldObjects = await createWorldObjects()
    const radialMenu = new RadialMenu()

    const orderBoard = new OrderBoard()

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

    const queueSystem = createQueueSystem() 

    const orderSystem  = createOrderSystem(
        queueSystem,
        player,
        orderBoard
    )

    //aca se cotnrola el player
    const interactionSystem = createInteractionSystem(
            player, 
            worldObjects, 
            keyboard, 
            orderSystem,
            radialMenu
        )
    
    //##### NPCs #####
    
    const npcTypes = await createNPCTypes()
    
    const npcSystem = createNPCSystem(
        colliders, 
        app.screen,
        npcTypes,
        queueSystem,
        keyboard, // esto solo lo estoy pasando a modo de debug para probar algunas cosas.
        orderBoard
    )

    await npcSystem.init()

    //##### SCENES #####
    app.stage.addChild(map)
    app.stage.addChild(worldObjects.container)
    app.stage.addChild(npcSystem.container)
    app.stage.addChild(player.container)
    app.stage.addChild(radialMenu.container)
    app.stage.addChild(orderBoard.container)

    const debug = createGameDebug(
        app, 
        player, 
        npcSystem, 
        colliders, 
        worldObjects,
        queueSystem,
    ) 
    //aca se agrega en el stage al contenedor de debug
    // para ver en consola
    
    window.debug = {
        player: player,
        npcs: npcSystem.NPCpool,
        activeNPCs: ()=> npcSystem.NPCpool.filter(npc => npc.active),
        colliders: colliders,
        worldObjects: worldObjects.objects,
        queueSystem: queueSystem,
        map: map,
        items: ITEMS,
        orderSystem: orderSystem,
        radialMenu: radialMenu
    }
    //##### GAME LOOP #####
    function update(delta){
        // pasar esto al player directamente o ver que ondeu
        //esta fue la implementacion mas rapida para "sie esta el menu abierto no te muevas"
        //si tira algun error, podria ver de hacer algo como si esta abierto que tome el handleInput del radial
        //y si no que obtenga el input para el movimiento
        const input = radialMenu.isOpen
            ? { x: 0, y: 0 }
            : getMovementInput(keyboard)

        radialMenu.handleInput(keyboard)
        interactionSystem.update()

        //poner un player.setDirection?
        player.dirX = input.x
        player.dirY = input.y

        player.update(delta)

        radialMenu.update(player)

        npcSystem.update(delta)
        
        worldObjects.update(delta)

        debug?.update()     
        
        if(keyboard.wasPressed(INPUT.DEBUG)) debug.toggle()
    }

    app.ticker.add((ticker) => {
        update(ticker.deltaTime)
    })

    return app
}


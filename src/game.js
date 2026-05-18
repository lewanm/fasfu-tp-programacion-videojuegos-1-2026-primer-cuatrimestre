import { GAME } from "./config/gameConfig.js"
import { Player } from "./entities/player.js";
import { createKeyboard } from "./systems/keyboard.js";
import { getMovementInput } from "./systems/movementInput.js";
import { createPlayerAtlas } from "./assets/atlas/playerAtlas.js";
import { createPlayerAnimations } from "./systems/animationStstem.js"
import { createDebugSystem } from "./debug/debugRenderer.js"
import { WORLD_OBJECTS } from "./world/worldObjects.js";

export async function createGame() {
    const app = new PIXI.Application()
    
    await app.init({
        width: GAME.WIDTH,
        height: GAME.HEIGHT,
        backgroundColor: GAME.BACKGROUND_COLOR
    })

    //##### ASSETS #####

    //MAPA - TEMPORAL, ver si lo paso a un archivo "world" en la carpeta "world"
    const mapTexture = await PIXI.Assets.load("./src/assets/images/map.png")
    const mapSprite = new PIXI.Sprite(mapTexture)
    mapSprite.label = "map"
    mapSprite.width = GAME.WIDTH
    mapSprite.height = GAME.HEIGHT

    //Player
    const playerTexture = await PIXI.Assets.load("./src/assets/characters/16x32-walk-sheet.png")

    const playerFrames = createPlayerAtlas(playerTexture)
    const playerAnimations = createPlayerAnimations(playerFrames)

    const player = new Player(playerAnimations)
    player.colliders = WORLD_OBJECTS
    const keyboard = createKeyboard()

    //Scene
    app.stage.addChild(mapSprite)
    app.stage.addChild(player.view)
   
    const debug = createDebugSystem(app, GAME.DEBUG_MODE);
    const debugEntities = GAME.DEBUG_MODE ? [debug.drawHitbox(player)] : null

    if (GAME.DEBUG_MODE) {
        //const sheet = debug.showSpriteSheet(playerTexture, 0, 0);
        //debug.drawAtlas(playerFrames, sheet);
        debug.drawColliders(WORLD_OBJECTS)
        //debug.drawHitbox(player)
        //debug.drawKitchen(KITCHEN);
    }

    //##### GAME LOOP #####
    function update(delta){
        const input = getMovementInput(keyboard)

        player.dirX = input.x
        player.dirY = input.y

        player.update(delta)
        debugEntities?.forEach(debugEntity => debugEntity.update())
    }

    app.ticker.add((ticker) => {
        update(ticker.deltaTime)
    })

    return app
}
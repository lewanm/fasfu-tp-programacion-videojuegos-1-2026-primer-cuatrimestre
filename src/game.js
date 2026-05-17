import { GAME } from "./config/gameConfig.js"
import { Player } from "./entities/player.js";
import { createKeyboard } from "./systems/keyboard.js";
import { getMovementInput } from "./systems/movementInput.js";
import { createPlayerAtlas } from "./assets/atlas/playerAtlas.js";
import { createPlayerAnimations } from "./systems/animationStstem.js"
import { createDebugSystem } from "./debug/debugRenderer.js"

export async function createGame() {
    const app = new PIXI.Application()
    
    await app.init({
        width: GAME.WIDTH,
        height: GAME.HEIGHT,
        backgroundColor: GAME.BACKGROUND_COLOR
    })

    //##### ASSETS #####

    //MAPA - TEMPORAL
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
    const keyboard = createKeyboard()

    //Scene
    app.stage.addChild(mapSprite)
    app.stage.addChild(player.view)
   
    const DEBUG = false;
    const debug = createDebugSystem(app, DEBUG);

    if (DEBUG) {
        const sheet = debug.showSpriteSheet(playerTexture, 0, 0);
        debug.drawAtlas(playerFrames, sheet);
        //debug.drawKitchen(KITCHEN);
    }

    //##### GAME LOOP #####
    function update(delta){
        const input = getMovementInput(keyboard)

        player.dirX = input.x
        player.dirY = input.y

        player.update(delta)
    }

    app.ticker.add((ticker) => {
        update(ticker.deltaTime)
    })

    return app
}
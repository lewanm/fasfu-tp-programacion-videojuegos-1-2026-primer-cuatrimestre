import { GAME } from "./config/gameConfig.js"
import { createPlayer } from "./entities/player.js";
import { createKeyboard } from "./input/keyboard.js";
import { setupDebug } from "./debug/debugRenderer.js";
import { getMovementInput } from "./input/movementInput.js";
import { createPlayerAtlas } from "./assets/atlas/playerAtlas.js";

export async function createGame() {
    const app = new PIXI.Application()
    
    await app.init({
        width: GAME.WIDTH,
        height: GAME.HEIGHT,
        backgroundColor: GAME.BACKGROUND_COLOR
    })

    //##### ASSETS #####

    //MAPA
    const mapTexture = await PIXI.Assets.load("./src/assets/images/map.png")
    const mapSprite = new PIXI.Sprite(mapTexture)
    mapSprite.label = "map"
    mapSprite.width = GAME.WIDTH;
    mapSprite.height = GAME.HEIGHT;

    //Player
    const playerTexture = await PIXI.Assets.load("./src/assets/characters/16x32-walk-sheet.png")
    const playerFrames = createPlayerAtlas(playerTexture)

    const playerAnmiations = {
        down: playerFrames.slice(0,4),
        right: playerFrames.slice(8,12),
        left: playerFrames.slice(8,12),
        up: playerFrames.slice(16,20)
    }

    const debugSheet = new PIXI.Sprite(playerTexture);
    debugSheet.label = "debugSheet";

    //Entities
    const player = createPlayer(playerAnmiations)
    const keyboard = createKeyboard()

    //layers
    const debugLayer = new PIXI.Container()
    debugLayer.label = "debugLayer"
    debugLayer.visible = false;

    //Scene
    app.stage.addChild(mapSprite)
    app.stage.addChild(player.view)
    app.stage.addChild(debugLayer)
    debugLayer.addChild(debugSheet)
    
    //agregue esto para ver como quedaban recortados los frames en el atlas.
    playerFrames.forEach((frame, i) => {
        const rect = frame.frame; // contiene x,y,width,height

        const debug = new PIXI.Graphics();
        debug
            .rect(rect.x + debugSheet.x, rect.y + debugSheet.y, rect.width, rect.height)
            .stroke({ color: 0xff0000 });

        debug.label = `atlas_debug_${i}`;

        debugLayer.addChild(debug);
    });


    //debug
    const DEBUG = true
    setupDebug(app, debugLayer, DEBUG)

    //player update
    function updatePlayer(delta){
        const input = getMovementInput(keyboard)

        player.dirX = input.x
        player.dirY = input.y

        player.update(delta)
    }

    //##### GAME LOOP #####
    function update(delta){
        updatePlayer(delta)
    }


    app.ticker.add((ticker) => {
        update(ticker.deltaTime)
    })

    return app;
    
}
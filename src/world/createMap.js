import { GAME } from "../config/gameConfig.js"
import { ASSETS } from "../config/assets.js"

export async function createMap(screen){

    const container = new PIXI.Container()
    container.label = "mapContainer"

    const mapTexture = PIXI.Assets.get(ASSETS.MAP.MAP)
    const map = new PIXI.Sprite(mapTexture)
    map.label = "map"
    map.width = GAME.WIDTH
    map.height = GAME.HEIGHT

    const awningTexture = PIXI.Assets.get(ASSETS.MAP.AWNING)
    const awning = new PIXI.Sprite(awningTexture)
    awning.label = "awning"
    awning.x = 116
    awning.y = 255
    awning.zIndex = 1400

    const driveThruTexture = PIXI.Assets.get(ASSETS.MAP.DRIVE_THRU_SIGNAL)
    const driveThru = new PIXI.Sprite(driveThruTexture)
    driveThru.label = "driveThru"
    driveThru.x = 96
    driveThru.y = 370
    driveThru.zIndex = 1400

    const triggersTexture = PIXI.Assets.get(ASSETS.MAP.TRIGGERS)
    const triggers = new PIXI.Sprite(triggersTexture)
    triggers.label = "triggers"
    triggers.x = 163
    triggers.y = 268

    const decorator = new PIXI.Container()
    decorator.x = 808
    decorator.y = 290

    decorator.label = "decorator"
    decorator.zIndex = 1400
    const computerTexture = PIXI.Assets.get(ASSETS.STATIC_OBJECTS.computer)
    const computer = new PIXI.Sprite(computerTexture)
    computer.label = "computer"
    const deliveryCounterTexture = PIXI.Assets.get(ASSETS.STATIC_OBJECTS.delivery_counter)
    const deliveryCounter = new PIXI.Sprite(deliveryCounterTexture)
    deliveryCounter.label = "deliveryCounter"
    deliveryCounter.y = 86


    decorator.addChild(computer)
    decorator.addChild(deliveryCounter)


    container.addChild(map)
    container.addChild(awning)
    container.addChild(driveThru)
    container.addChild(triggers)
    container.addChild(decorator)


    return container
}
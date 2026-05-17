import { KITCHEN } from "../config/gameConfig.js"

export function setupDebug(app, debugLayer, enabled = false){
    if (!enabled) return

    app.stage.eventMode = "static"
    app.stage.hitArea = app.screen

    app.stage.on("pointerdown", (event) => {
        const pos = event.global
        console.log(`x:${pos.x}  y:${pos.y}`)
    })

    const kitchenDebug = new PIXI.Graphics()
    kitchenDebug.label = "kitchenBounds"

    kitchenDebug
        .rect(KITCHEN.x, KITCHEN.y, KITCHEN.width, KITCHEN.height)
        .fill({color: 0x00ff00, alpha: 0.2})
        .stroke({color: 0x00ff00, width: 2})
    
    debugLayer.addChild(kitchenDebug)
}

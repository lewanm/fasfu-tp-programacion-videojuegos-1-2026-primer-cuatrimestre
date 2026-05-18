export function createDebugSystem(app, enabled = false){
    const debugLayer = new PIXI.Container()
    debugLayer.label = "debugLayer"
    debugLayer.visible = enabled

    app.stage.addChild(debugLayer)

    if (!enabled) return { layer: debugLayer }

    app.stage.eventMode = "static"
    app.stage.hitArea = app.screen

    app.stage.on("pointerdown", (e) => {
        const pos = e.global
        console.log(`x:${pos.x} y:${pos.y}`);
    })

    return {
        layer: debugLayer,

        drawAtlas(frames, sheet){
            frames.forEach((frame,i) => {
                const rect = frame.frame
                const g = new PIXI.Graphics()
                g.rect(
                    rect.x + sheet.x,
                    rect.y + sheet.y,
                    rect.width,
                    rect.height
                )
                .stroke({color: 0xff0000})

                g.label = `atlas_${i}`

                debugLayer.addChild(g)

            })
        },

        showSpriteSheet(texture, x = 0, y = 0){
            const s = new PIXI.Sprite(texture)
            s.x = x
            s.y = y
            debugLayer.addChild(s)
            return s
        },

        
        drawColliders(objects){
            objects.forEach(obj => {
                const g = new PIXI.Graphics();

                g.rect(obj.x, obj.y, obj.width, obj.height)
                .fill({ color: 0xff0000, alpha: 0.2 })
                .stroke({ color: 0xff0000 });

                this.layer.addChild(g);
            });
        },

        drawHitbox(entity){
            const g = new PIXI.Graphics();
            debugLayer.addChild(g);

            return {
                update(){
                    const bounds = entity.getBounds();
                    g.clear()
                    g.rect(bounds.x, bounds.y, bounds.width, bounds.height)
                    .fill({ color: 0x00ff00, alpha: 0.2 })
                    .stroke({ color: 0x00ff00 });
                }
            }
        }

    }
}
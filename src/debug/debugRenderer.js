import { DEBUG_STATE_COLORS } from "../config/debugConfig.js"

export function createDebugSystem(app, enabled = false){
    const debugLayer = new PIXI.Container()
    debugLayer.label = "debugLayer"
    debugLayer.visible = enabled
    debugLayer.zIndex = 1200 // por ahora lo dejo asi, no se como hacer para que quede adelante de todo si no jijiji

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
        debugEntities : [],

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
        },

        drawTrigger(trigger){
            const g = new PIXI.Graphics();

            g.rect(trigger.x, trigger.y, trigger.width, trigger.height)
            .stroke({ color: 0xFFFF00 });

            this.layer.addChild(g);
        },

        drawEntityState(entity){
            return {
                update(){
                    let color = DEBUG_STATE_COLORS[entity.state] ?? 0xffffff
                
                    if (entity.isHungry()){
                        entity.view.tint = 0xff0000
                    }

                    entity.view.tint = color
                }
            }
        }

    }
}
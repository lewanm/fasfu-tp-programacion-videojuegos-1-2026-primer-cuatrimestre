import { DEBUG_STATE_COLORS } from "../config/debugConfig.js"

export function createDebugSystem(app, enabled = false){
    const debugLayer = new PIXI.Container()
    debugLayer.label = "debugLayer"
    debugLayer.visible = enabled
    debugLayer.zIndex = 2000 // por ahora lo dejo asi, no se como hacer para que quede adelante de todo si no jijiji

    app.stage.addChild(debugLayer)

    //if (!enabled) return { layer: debugLayer }

    app.stage.eventMode = "static"
    app.stage.hitArea = app.screen

    app.stage.on("pointerdown", (e) => {
        if(!debugLayer.visible) return
        const pos = e.global
        console.log(`x:${pos.x} y:${pos.y}`);
    })

    return {
        layer: debugLayer,
        debugEntities : [],

        toggle(){
            this.layer.visible = !this.layer.visible
            return this.layer.visible
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
        },

        drawWaypoint(position){
            const g = new PIXI.Graphics();

            g.circle(position.x, position.y, 6)
            .fill({ color: 0xffff00 });

            this.layer.addChild(g);
        },

        drawQueuePosition(position){
            const g = new PIXI.Graphics();

            g.circle(position.x, position.y, 6)
            .fill({ color: 0x00aaff });

            this.layer.addChild(g);
        },

        drawPath(path){

            const g = new PIXI.Graphics();

            for(let i = 0; i < path.length - 1; i++){

                g.moveTo(path[i].x, path[i].y)
                .lineTo(path[i + 1].x, path[i + 1].y)
                .stroke({ color: 0xffff00, width: 2 });
            }

            this.layer.addChild(g);
        }
    }
}
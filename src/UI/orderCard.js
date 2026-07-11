import { ASSETS } from "../config/assets.js"

const ITEM_POSITIONS = [
    { x: 68, y: 74},
    { x: 30, y: 46},
    { x: 102, y: 46}
]

export class OrderCard {
    constructor(order, source, testCardPosition = 0){
        console.log("ORDER:", order)
        console.log("SOURCE:", source)
        this.order = order
        this.source = source
        
        this.container = new PIXI.Container()
        this.container.label = "orderCard"
        this.container.x = testCardPosition

        const backgroundTexture = PIXI.Assets.get(
            source === "driveThru"
                ? ASSETS.HUD.orderDriveThru
                : ASSETS.HUD.orderCounter
        )

        this.background = new PIXI.Sprite(backgroundTexture)
        this.container.addChild(this.background)

        this.itemSprites = []

        order.items.forEach((item, index) => {
            const texture = PIXI.Assets.get(item.asset)

            const sprite = new PIXI.Sprite(texture)

            sprite.anchor.set(0.5)

            const position = ITEM_POSITIONS[index]
            
            if (position) {
                sprite.x = position.x
                sprite.y = position.y
            }

            this.configureItemSprite(sprite, item, index, order)

            this.container.addChild(sprite)
            this.itemSprites.push(sprite)
        })
    }

    //no lo hago tan legible, porque ya no mucho tiempo :(
    //pero es para mover un poco los sprites en las cards
    configureItemSprite(sprite, item, index, order){

        if (index !== 0) return

        switch (item.type){

            case "fries":
                sprite.scale.set(1.4)
                if (order.items.length === 1) sprite.y -= 5
                break

            case "soda":
                sprite.scale.set(1.3)
                if (order.items.length === 1) sprite.y -= 5
                 break
        }
    }
}




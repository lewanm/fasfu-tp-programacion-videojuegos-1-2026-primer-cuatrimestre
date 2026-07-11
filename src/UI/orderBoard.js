const START_X = 160
const START_Y = 20
const CARD_SPACING = 150

export class OrderBoard {

    constructor(){

        this.container = new PIXI.Container()
        this.cards = []
    }

    add(card){

        this.cards.push(card)
        this.container.addChild(card.container)
        this.updatePositions()
    }

    remove(card){

        const index = this.cards.indexOf(card)

        if (index === -1) return

        this.cards.splice(index, 1)
        this.container.removeChild(card.container)
        this.updatePositions()
    }

    updatePositions(){

        this.cards.forEach((card, index) => {
            card.container.x = START_X + CARD_SPACING * index
            card.container.y = START_Y
        })
    }
}
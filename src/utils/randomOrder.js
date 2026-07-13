import { ORDERS } from "../config/orders.js"
import { ITEMS } from "../config/items.js"

const SODAS = [
    ITEMS.RED_SODA,
    ITEMS.BLUE_SODA,
    ITEMS.GREEN_SODA,
    ITEMS.YELLOW_SODA
]

function getRandomSoda() {

    const index = Math.floor(Math.random() * SODAS.length)

    return { ...SODAS[index] }
}

export function getRandomOrder() {

    const index = Math.floor(Math.random() * ORDERS.length)
 
    const order = structuredClone(ORDERS[index])

    order.items = order.items.map(item => {

        if (item.id === "random_soda") {
            return getRandomSoda()
        }

        return item
    })

    return order
}
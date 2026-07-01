import { ORDERS } from "../config/orders.js"

export function getRandomOrder(){
    
    const index = Math.floor(Math.random() * ORDERS.length)
    console.log(index)

    return structuredClone(ORDERS[index])

}
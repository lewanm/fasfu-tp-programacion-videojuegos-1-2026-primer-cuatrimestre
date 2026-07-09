import { getRandomOrder } from "../utils/randomOrder.js"
import { STATES } from "./states.js"

export function createOrderSystem(queueSystem){

    function getCurrentCustomer(){
        return queueSystem.getFirst()
    }

    function canTakeOrder(){

        const npc = getCurrentCustomer()

        if (!npc) return false

        return (
            !npc.hasOrdered &&
            npc.queueIndex === 0 &&
            npc.isAtTargetPosition() &&
            queueSystem.hasWaitingSpace()
        )
    }

    function takeOrder(){

        if (!canTakeOrder()) return null

        const npc = getCurrentCustomer()

        npc.order = getRandomOrder()

        npc.hasOrdered = true

        queueSystem.moveToWaiting(npc)

        console.log(`${npc.name} pidió: `, npc.order)
        console.log(npc.order.items)    

        return npc.order
    }

    function validateOrder(order, tray){
        const orderIds = order.items.map(item => item.id).sort()

        const trayIds = tray.contents.map(item => item.id).sort()
        
        return JSON.stringify(orderIds) === JSON.stringify(trayIds)
    }

function deliverOrder(player){

    const npc = queueSystem.getFirstWaiting()

    if (!npc){
        console.log("No hay clientes esperando")
        return false
    }

    if (!player.heldItem){
        console.log("No tenes nada para entregar")
        return false
    }

    if (player.heldItem.type !== "bag"){
        console.log("Necesitas una bandeja")
        return false
    }

    const validOrder = validateOrder(npc.order, player.heldItem)

    if (!validOrder){
        console.log("Pedido incorrecto")
        return false
    }

    npc.eat(100)

    queueSystem.removeWaiting(npc)

    console.log(`${npc.name} recibió el pedido y se retira`)

    npc.changeState(STATES.leaving)

    player.removeItem()

    console.log("Pedido correcto")

    return true
}

    return {
        takeOrder,
        canTakeOrder,
        getCurrentCustomer,
        validateOrder,
        deliverOrder
    }
}
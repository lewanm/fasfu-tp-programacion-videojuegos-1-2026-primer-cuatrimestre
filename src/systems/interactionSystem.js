import { isColliding } from "./collisionSystem.js";
import { isInsideTrigger } from "../utils/trigger.js";
import { TRIGGERS } from "../config/triggers.js"
import { getInteractionInput } from "./interactionInput.js";

export function createInteractionSystem(player, worldObjects, keyboard, orderSystem){
    
    function update(){
        const interactPressed = getInteractionInput(keyboard)
        
        if (!interactPressed) return

        if (tryTakeOrder()) return

        if (tryDeliverOrder()) return

        tryInteractWithWorldObject()
    }

    function tryTakeOrder(){
        if (!isInsideTrigger(player, TRIGGERS.orderCounter)) return false
        
        return !!orderSystem.takeOrder()
    }

    function tryDeliverOrder(){
        if(!isInsideTrigger(player, TRIGGERS.deliveryCounter)) return false

        return orderSystem.deliverOrder(player)
    }

    function tryInteractWithWorldObject() {

        const playerBounds = player.getBounds()

        const target = worldObjects.objects.find(obj => {

            const trigger = obj.getTriggerBounds()

            return trigger && isColliding(playerBounds, trigger)
        })

        if (!target) return false

        target.interact?.(player)

        return true
    }

    return {
        update
    }
}
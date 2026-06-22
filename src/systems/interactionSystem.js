import { isColliding } from "./collisionSystem.js";
import { getInteractionInput } from "./interactionInput.js";

export function createInteractionSystem(player, worldObjects, keyboard){
    
    function update(){
        const interactPressed = getInteractionInput(keyboard)
        
        if (!interactPressed) {
            return
        }

        const playerBounds = player.getBounds()

        const target = worldObjects.objects.find( obj => {
            const trigger = obj.getTriggerBounds()
            return trigger && isColliding(playerBounds, trigger)
        })

        if (target){
            target.interact?.(player)
        }
    }

    return {
        update
    }
}
import { isColliding } from "../systems/collisionSystem.js";

export function isInsideTrigger(entity, trigger){
    return isColliding(entity.getBounds(), trigger)
}
const RESTAURANT_ENTRANCE_START_X = 1164
const RESTAURANT_ENTRANCE_START_Y = 570
const RESTAURANT_ENTRANCE_STEP_X = 0
const RESTAURANT_ENTRANCE_STEP_Y = 80
const RESTAURANT_ENTRANCE_WAYPOINT_COUNT = 3

const ORDER_QUEUE_START_X = 892
const ORDER_QUEUE_START_Y = 314
const ORDER_QUEUE_STEP_X = 60
const ORDER_QUEUE_STEP_Y = 0
const ORDER_QUEUE_SIZE = 6

const WAITING_QUEUE_START_X = 892
const WAITING_QUEUE_START_Y = 397
const WAITING_QUEUE_STEP_X = 60
const WAITING_QUEUE_STEP_Y = 0
const WAITING_QUEUE_SIZE = 6

const restaurantEntrance = generatePositions(
        RESTAURANT_ENTRANCE_START_X,
        RESTAURANT_ENTRANCE_START_Y,
        RESTAURANT_ENTRANCE_STEP_X,
        RESTAURANT_ENTRANCE_STEP_Y,
        RESTAURANT_ENTRANCE_WAYPOINT_COUNT
    )

export const PATHS = {

    restaurantEntrance,        

    restaurantExit: [...restaurantEntrance].reverse()
}

export const POSITIONS = {

    orderQueue:
        generatePositions(
            ORDER_QUEUE_START_X,
            ORDER_QUEUE_START_Y,
            ORDER_QUEUE_STEP_X,
            ORDER_QUEUE_STEP_Y,
            ORDER_QUEUE_SIZE
        ),

    waitingQueue:
        generatePositions(
            WAITING_QUEUE_START_X,
            WAITING_QUEUE_START_Y,
            WAITING_QUEUE_STEP_X,
            WAITING_QUEUE_STEP_Y,
            WAITING_QUEUE_SIZE
        )
}


function generatePositions(startX, startY, stepX, stepY, count) {
    const positions = [];
    
    for (let i = 0; i < count; i++) {
        positions.push({
            x: startX + stepX * i,
            y: startY - stepY * i
        });
    }
    
    return positions;
}
export function createQueueSystem(){

    const orderQueue = []
    const waitingQueue = []

    //Esto tendria que mandarlo a otro archivo pero... no tengo ganas :(
    const ORDER_QUEUE_Y_POSITION = 160
    const WAITING_QUEUE_Y_POSITION = 210
    const QUEUE_X_POSITION = 440
    const SLOT_SPACING  = 35 //no se que palabra usar para espacio entre personas

    const queuePositions = [
        {x: QUEUE_X_POSITION, y: ORDER_QUEUE_Y_POSITION},
        {x: QUEUE_X_POSITION + SLOT_SPACING  * 1, y: ORDER_QUEUE_Y_POSITION},
        {x: QUEUE_X_POSITION + SLOT_SPACING  * 2, y: ORDER_QUEUE_Y_POSITION},
        {x: QUEUE_X_POSITION + SLOT_SPACING  * 3, y: ORDER_QUEUE_Y_POSITION},
        {x: QUEUE_X_POSITION + SLOT_SPACING  * 4, y: ORDER_QUEUE_Y_POSITION}
    ]

    const waitingPositions = [
        {x: QUEUE_X_POSITION, y: WAITING_QUEUE_Y_POSITION},
        {x: QUEUE_X_POSITION + SLOT_SPACING  * 1, y: WAITING_QUEUE_Y_POSITION},
        {x: QUEUE_X_POSITION + SLOT_SPACING  * 2, y: WAITING_QUEUE_Y_POSITION},
        {x: QUEUE_X_POSITION + SLOT_SPACING  * 3, y: WAITING_QUEUE_Y_POSITION},
        {x: QUEUE_X_POSITION + SLOT_SPACING  * 4, y: WAITING_QUEUE_Y_POSITION}
    ]

    const queueEntryPath = [
        {x: 590, y: 326},
        {x: 590, y: 226}
    ]

    const MAX_QUEUE_SIZE = queuePositions.length

    function hasSpace() {
        return orderQueue.length < MAX_QUEUE_SIZE
    }

    function hasWaitingSpace(){
        return waitingQueue.length < waitingPositions.length
    }

    function getFirst(){
        return orderQueue[0]
    }

    function add(npc){
        if(orderQueue.includes(npc)) return

        orderQueue.push(npc)

        npc.path = [...queueEntryPath]
        npc.currentWaypoint = 0

        updateOrderPositions()
    }

    function remove(npc){
        const index = orderQueue.indexOf(npc)
        
        if (index === -1) return

        orderQueue.splice(index, 1)

        updateOrderPositions()
    }

    function updateOrderPositions(){
        orderQueue.forEach((npc, index) => {
            
            npc.queueIndex = index
            npc.queueTargetPosition = queuePositions[index] ?? queuePositions.at(-1)
        })
    }

    function updateWaitingPositions(){

        waitingQueue.forEach((npc, index) => {

            npc.queueTargetPosition = waitingPositions[index] ?? waitingPositions.at(-1)
        })
    }

    function moveToWaiting(npc){
        const index = orderQueue.indexOf(npc)
        
        if (index === -1) return

        orderQueue.splice(index, 1)

        waitingQueue.push(npc)

        npc.path = []
        npc.currentWaypoint = 0
    
        updateOrderPositions()
        updateWaitingPositions()
    }

   

    return {
        add,
        remove,
        getFirst,

        hasSpace,
        hasWaitingSpace,

        moveToWaiting,
        
        orderQueue,
        waitingQueue,

        queueEntryPath,
        waitingPositions,
        queuePositions
    }

}
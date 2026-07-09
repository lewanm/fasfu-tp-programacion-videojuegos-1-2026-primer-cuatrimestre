import { PATHS, POSITIONS } from "../config/navigationPaths.js"

export function createQueueSystem(){

    const orderQueue = []
    const waitingQueue = []

    const queuePositions = POSITIONS.orderQueue
    const waitingPositions = POSITIONS.waitingQueue

    const queueEntryPath = PATHS.restaurantEntrance

    function hasSpace() {
        return orderQueue.length < queuePositions.length
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

    function removeWaiting(npc) {

        const index = waitingQueue.indexOf(npc)

        if (index === -1) return

        waitingQueue.splice(index, 1)

        updateWaitingPositions()
    }

    function getFirstWaiting(){
        return waitingQueue[0]
    }
   

    return {
        add,
        remove,
        removeWaiting,
        getFirst,
        getFirstWaiting,

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
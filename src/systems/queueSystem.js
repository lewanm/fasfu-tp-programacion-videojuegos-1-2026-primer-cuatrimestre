export function createQueueSystem(){

    const orderQueue = []
    const waitingQueue = []

    //Esto tendria que mandarlo a otro archivo pero... no tengo ganas :(
    const ORDER_QUEUE_Y_POSITION = 314
    const WAITING_QUEUE_Y_POSITION = 397
    const QUEUE_X_POSITION = 892
    const SLOT_SPACING  = 60 //no se que palabra usar para espacio entre personas
    const MAX_QUEUE_SIZE = 6
    //podria reemplazar esto por un for a si dejo de repetir todo... comente esto
    //y la ia que completa cosas me sugirio de una que lo haga, grande la IA
    const queuePositions = []
    for (let i = 0; i < MAX_QUEUE_SIZE; i++) {
        queuePositions.push({x: QUEUE_X_POSITION + SLOT_SPACING * i, y: ORDER_QUEUE_Y_POSITION})
    }

    const waitingPositions = []
    for (let i = 0; i < MAX_QUEUE_SIZE; i++) {
        waitingPositions.push({x: QUEUE_X_POSITION + SLOT_SPACING * i, y: WAITING_QUEUE_Y_POSITION})
    }

    //esto es para que sigan un caimnito al entrar y no se queden trabados, tambien podria servir para salir solo que lo transitarian al reves
    /*
        {x: 1164, y: 570},
        {x: 1164, y: 510},
        {x: 1164, y: 450},
    */
    
    //no creo que sirva para otras cosas tonces lo dejo aca (mentira mientras lo pensaba se que va a servir para los autos)
    //despues lo muevo a utils
    //TODO:
    function generarWaypointsY(startX, startY, incrementY, count) {
        const waypoints = [];
        
        for (let i = 0; i < count; i++) {
            waypoints.push({
                x: startX,
                // Restamos porque en tu ejemplo Y disminuye de 60 en 60
                y: startY - (i * incrementY) 
            });
        }
        
        return waypoints;
    }
    const queueEntryPath = generarWaypointsY(1164, 570, 60, 3)

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
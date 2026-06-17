import { Fridge } from "../entities/StaticObject.js"

//despues modificar el array con cada objeto, por un diccionario tipo pared_inferio : { x: 366, y:126, width: 39, height: 118 } y llamo a pared inferior.
export const WALLS = [
    //pared_derecha
    { x: 380, y: 112, width: width(380,408), height: height(112, 240) },
    //pared_superior
    { x: 70, y: 92, width: width(70,380), height: height(92,112) },
    //pared_izquierda
    { x: 54, y: 114, width: width(54, 70), height: height(114,240) },
    //pared_inferior
    { x: 69, y: 242, width: width(69,380), height: height(242,256) },
]

export const WORLD_OBJECTS = [
    {
        type: "fridge",
        x: 72,
        y: 140
    }

]

function width(initialX, finalX){
    return finalX - initialX
}

function height(initialY, finalY){
    return finalY - initialY
}
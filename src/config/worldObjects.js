//despues modificar el array con cada objeto, por un diccionario tipo pared_inferio : { x: 366, y:126, width: 39, height: 118 } y llamo a pared inferior.
export const WALLS = [
    //pared_derecha
    { x: 380, y: 112, width: width(380,408), height: height(112, 240) },
    //pared_superior
    { x: 70, y: 92, width: width(70,380), height: height(92,125) },
    //pared_izquierda
    { x: 54, y: 114, width: width(54, 70), height: height(114,240) },
    //pared_inferior
    { x: 69, y: 242, width: width(69,380), height: height(242,256) },
]

//el type del triger no lo termine usando
export const OBJECT_TEMPLATES = {
    fridge: {
        name: "fridge",
        width: 36,
        height: 76,
        hitboxOffset: { x: 0, y: -3 },
        isSolid: true,
        trigger: {
            type: "interact",
            width: 36,
            height: 30,
            offset: { x: 0, y: 0 }
        },        
        itemFactory: () => ({
            type: "burger",
            state: "raw"
        })
    },
    fryer: {
        name: "fryer",
        width: 70, 
        height: 40,
        hitboxOffset: { x: 0, y: -3 },
        isSolid: true,
        trigger: {
            type: "interact",
            width: 70,
            height: 30,
            offset: { x: 0, y: 0 }
        },
        cookTime: 200,
        acceptedTypes: ["fries"]
    },
    oven: {
        name: "oven",
        width: 70,
        height: 36,
        hitboxOffset: { x: 0, y: -3 },
        isSolid: true,
        trigger: {
            type: "interact",
            width: 70,
            height: 30,
            offset: { x: 0, y: 0 }
        },
        cookTime: 200,
        acceptedTypes: ["burger"]
    },
    soda: {
        name: "soda",
        width: 72,
        height: 42,
        hitboxOffset: { x: 0, y: 0 },
        isSolid: true,
        trigger: {
            type: "interact",
            width: 72,
            height: 30,
            offset: { x: 0, y: 13 }
        },
        itemFactory: () => ({
            type: "soda",
            variant: "cola"
        })
    },
    tray: {
        name: "tray",
        width: 90,
        height: 40,
        hitboxOffset: { x: 4, y: -8 },
        isSolid: true,
        trigger: {
            type: "interact",
            width: 130,
            height: 40,
            offset: { x: -15, y: -45 }
        },
        maxSlots: 3,
    },
};

export const ITEM_TEMPLATES = {
    burger: {
        type: "burger",

        states:{
            raw: { color: 0xFFC0CB }, // rosita
            cooked: { color: 0x8b4513 }
        },

        cookTime: 200
    },
    fries: {
        type: "fries",

        states:{
            raw: { color: 0xffd700 },     // amarillo
            cooked: { color: 0xffa500 }  // naranja
        },

        cookTime: 150
    },
    soda: {
        type: "soda",

        variants: {
            cola: { color: 0x000000 },
            orange: { color: 0xff6600 }
        }
    }
}

//aca es para instanciar nuevos objetos, indicando el tipo, que tiene que coincidir con el nombre
//Y asigno el X y el Y, como estoy usando de pivote 0,1 con hacer click en el juego en modo de debug
//y usa las coordenadas que da.
export const WORLD_OBJECTS = [
    { type: "fridge", position: { x: 160, y: 128 } },
    { type: "fryer", position: { x: 284, y: 128 } },
    { type: "oven", position: { x: 206, y: 128 } },
    { type: "soda", position: { x: 79, y: 113 } },
    { type: "tray", position: { x: 164, y: 220 } },
];

function width(initialX, finalX){
    return finalX - initialX
}

function height(initialY, finalY){
    return finalY - initialY
}
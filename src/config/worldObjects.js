//despues modificar el array con cada objeto, por un diccionario tipo pared_inferio : { x: 366, y:126, width: 39, height: 118 } y llamo a pared inferior.
export const WALLS = [
    //pared_superior
    { x: 162, y: 214, width: width(162,792), height: height(214, 269) },
    //pared_izquierda
    { x: 138, y: 214, width: width(138, 162), height: height(214, 544) },
    //pared_derecha
    { x: 792, y: 214, width: width(792,851), height: height(214,438) },
    //pared_inferior
    { x: 163, y: 438, width: width(163,1093), height: height(438, 545) },

]

//el type del triger no lo termine usando
export const OBJECT_TEMPLATES = {
    fridge: {
        name: "fridge",
        width: 52,
        height: 115,
        hitboxOffset: { x: 2, y: -3 },
        isSolid: true,
        trigger: {
            type: "interact",
            width: 52,
            height: 26,
            offset: { x: 2, y: 0 }
        },        
        itemFactory: () => ({
            type: "burger",
            state: "raw"
        })
    },
    fryer: {
        name: "fryer",
        width: 52, 
        height: 40,
        hitboxOffset: { x: 2, y: -3 },
        isSolid: true,
        trigger: {
            type: "interact",
            width: 52,
            height: 26,
            offset: { x: 2, y: 0 }
        },
        cookTime: 200,
        acceptedTypes: ["fries"]
    },
    oven: {
        name: "oven",
        width: 48,
        height: 36,
        hitboxOffset: { x: 2, y: -3 },
        isSolid: true,
        trigger: {
            type: "interact",
            width: 48,
            height: 26,
            offset: { x: 2, y: 0 }
        },
        cookTime: 200,
        acceptedTypes: ["burger"]
    },
    soda: {
        name: "soda",
        width: 104,
        height: 42,
        hitboxOffset: { x: 2, y: 0 },
        isSolid: true,
        trigger: {
            type: "interact",
            width: 88,
            height: 26,
            offset: { x: 10, y: 26 }
        },
        itemFactory: () => ({
            type: "soda",
            variant: "cola"
        })
    },
    tray: {
        name: "tray",
        width: 84,
        height: 60,
        hitboxOffset: { x: 2, y: -10 },
        isSolid: true,
        trigger: {
            type: "interact",
            width: 136,
            height: 54,
            offset: { x: -24, y: -60 }
        },
        maxSlots: 3,
    },
    thrash: {
        name: "thrash",
        width: 40,
        height: 56,
        hitboxOffset: { x: 8, y: -2 },
        isSolid: true,
        trigger: {
            type: "interact",
            width: 68,
            height: 42,
            offset: { x: -8, y: -36 }
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

const bottom = 270
//aca se instancian
//pa hacerlo facil esto, lo mejor es usar la herramienda de debug que te da el click, pero despues revisar con las pixidevtolls y moverlo ahi
export const WORLD_OBJECTS = [
    { type: "soda", position: { x: 180, y: 243 } },
    { type: "fridge", position: { x: 320, y: bottom } },
    { type: "oven", position: { x: 400, y: bottom } },
    { type: "oven", position: { x: 475 , y: bottom } },
    { type: "fryer", position: { x: 549, y: bottom } },
    { type: "fryer", position: { x: 625, y: bottom } },
    { type: "tray", position: { x: 456, y: 394 } },
    { type: "thrashCan", position: { x: 320, y: 400 } },
];

function width(initialX, finalX){
    return finalX - initialX
}

function height(initialY, finalY){
    return finalY - initialY
}
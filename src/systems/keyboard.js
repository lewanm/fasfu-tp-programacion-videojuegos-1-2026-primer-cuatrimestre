export function createKeyboard(){
    const keys = {}

    window.addEventListener("keydown", (event) => {
        keys[event.code] = true
    })

    window.addEventListener("keyup", (event) => {
        keys[event.code] = false
    })

    return {
        isPressed(code){
            if (Array.isArray(code)){
                return code.some(key => !!keys[key])
            }
            //esto es para forzar un booleano, por ej. en caso de que devuelva unidefined, lo convierte a falso. Seria similar a poner "keys[code] === true"
            return !!keys[code]
        }
    }
}
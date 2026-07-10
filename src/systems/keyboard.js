export function createKeyboard() {

    const keys = {}
    const justPressed = {}

    window.addEventListener("keydown", event => {

        if (!keys[event.code]) {
            justPressed[event.code] = true
        }

        keys[event.code] = true
    })

    window.addEventListener("keyup", event => {

        keys[event.code] = false
    })

    function isPressed(code) {

        if (Array.isArray(code)) return code.some(key => !!keys[key])

        return !!keys[code]
    }

function wasPressed(code) {

    if (Array.isArray(code)) {

        return code.some(key => {

            const pressed = !!justPressed[key]

            if (pressed) justPressed[key] = false            

            return pressed
        })
    }

    const pressed = !!justPressed[code]

    justPressed[code] = false

    return pressed
}

    return {
        isPressed,
        wasPressed
    }
}
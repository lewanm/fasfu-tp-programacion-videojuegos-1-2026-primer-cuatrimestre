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

        const pressed = !!justPressed[code]

        justPressed[code] = false

        return pressed
    }

    return {
        isPressed,
        wasPressed
    }
}
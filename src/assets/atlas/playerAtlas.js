export function createPlayerAtlas(texture){
    const FRAME_WIDTH = 17
    const FRAME_HEIGHT = 26

    const OFFSET_X = 8
    const OFFSET_Y = 6

    const PADDING_X = 15
    const PADDING_Y = 6

    const frames = []

    const COLS = 4
    const ROWS = 5

    for (let row = 0 ; row < ROWS ; row++){
        for (let col = 0; col < COLS ; col++){

            const x = OFFSET_X + col * (FRAME_WIDTH + PADDING_X)
            const y = OFFSET_Y + row * (FRAME_HEIGHT + PADDING_Y)

            const rect = new PIXI.Rectangle(x, y, FRAME_WIDTH, FRAME_HEIGHT)
            
            const frameTexture = new PIXI.Texture({
                source: texture.source,
                frame: rect
            })

            frames.push(frameTexture)
        }
    }

    return frames
}
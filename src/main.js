import { createGame } from "./game.js"

async function main(){

    const app = await createGame()

    window.__PIXI_APP__ = app;
    
    document.body.appendChild(app.canvas);
}

main()


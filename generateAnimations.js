//Este script le pedi a una IA que me lo haga para modificar los .json y crear las animacines en el .json

import fs from "fs";

// 🔧 CONFIG
const inputFile = process.argv[2]; // archivo input
const outputFile = process.argv[3] || inputFile; // sobreescribe si no pasás output

if (!inputFile) {
    console.error("Uso: node generateAnimations.js archivo.json");
    process.exit(1);
}

// 📁 leer JSON
const data = JSON.parse(fs.readFileSync(inputFile, "utf-8"));

const frames = Object.keys(data.frames);

// 🎯 agrupar por animación
const animations = {};

frames.forEach(frameName => {
    // npc_1_down_0 → ["npc","1","down","0"]
    const parts = frameName.split("_");

    // dirección está en penúltima posición
    const direction = parts[parts.length - 2];
    const index = parseInt(parts[parts.length - 1]);

    if (!animations[direction]) {
        animations[direction] = [];
    }

    animations[direction].push({
        name: frameName,
        index
    });
});

// ✅ ordenar frames
Object.keys(animations).forEach(key => {
    animations[key] = animations[key]
        .sort((a, b) => a.index - b.index)
        .map(f => f.name);
});

// ✅ agregar al JSON
data.animations = animations;

// 💾 guardar
fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));

console.log("✅ Animaciones generadas correctamente");

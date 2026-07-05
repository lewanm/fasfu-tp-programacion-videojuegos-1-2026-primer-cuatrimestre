import fs from "fs";

// 🔧 CONFIG
const inputFile = process.argv[2];
const outputFile = process.argv[3] || inputFile;

if (!inputFile) {
    console.error(
        "Uso: node generateAnimations.js archivo.json"
    );
    process.exit(1);
}

// 📁 leer JSON
const data = JSON.parse(
    fs.readFileSync(inputFile, "utf-8")
);

const frames = Object.keys(data.frames);

const animations = {};

frames.forEach(frameName => {

    const parts = frameName.split("_");

    const lastPart = parts.at(-1);

    if (Number.isNaN(Number(lastPart))) {
        return;
    }

    const index = Number(lastPart);

    const animationKey =
        parts.slice(0, -1).join("_");

    if (!animations[animationKey]) {
        animations[animationKey] = [];
    }

    animations[animationKey].push({
        name: frameName,
        index
    });
});

// ✅ ordenar frames
Object.keys(animations).forEach(key => {

    animations[key] = animations[key]
        .sort((a, b) => a.index - b.index)
        .map(frame => frame.name);

});

// ✅ agregar al json
data.animations = animations;

// 💾 guardar
fs.writeFileSync(
    outputFile,
    JSON.stringify(data, null, 2)
);

console.log(
    "✅ Animaciones generadas correctamente"
);
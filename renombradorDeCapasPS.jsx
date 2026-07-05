var doc = app.activeDocument;
var layers = doc.artLayers;

// Pedir el prefijo al usuario (ej: npc_2)
var prefijo = prompt("Introduce el prefijo para el personaje (ej: npc_2):", "npc_2");

if (prefijo != null && prefijo != "") {
    // Photoshop lee las capas de arriba hacia abajo en el panel.
    // Asegurate de que la primera capa (arriba) sea el frame 0 de 'down'
    for (var i = 0; i < layers.length; i++) {
        var anim = "down";
        var frame = i;

        if (i >= 4 && i < 8) {
            anim = "right";
            frame = i - 4;
        } else if (i >= 8 && i < 12) {
            anim = "up";
            frame = i - 8;
        }

        // Renombrar la capa
        layers[i].name = prefijo + "_" + anim + "_" + frame;
    }
    alert("¡Capas renombradas correctamente!");
}
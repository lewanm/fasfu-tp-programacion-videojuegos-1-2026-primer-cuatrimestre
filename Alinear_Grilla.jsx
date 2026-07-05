var doc = app.activeDocument;
var layers = doc.artLayers;
var cols = 4;
var cellSize = 80; // Tamaño de tu celda

for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];
    doc.activeLayer = layer;
    
    // Calcular fila y columna basado en el orden de las capas
    var col = i % cols;
    var row = Math.floor(i / cols);
    
    // Calcular centro de la celda de destino
    var targetX = (col * cellSize) + (cellSize / 2);
    var targetY = (row * cellSize) + (cellSize / 2);
    
    // Obtener centro actual del sprite
    var bounds = layer.bounds;
    var currentX = (bounds[0].as("px") + bounds[2].as("px")) / 2;
    var currentY = (bounds[1].as("px") + bounds[3].as("px")) / 2;
    
    // Mover al centro perfecto
    layer.translate(targetX - currentX, targetY - currentY);
}
alert("¡Sprites alineados en grilla!");
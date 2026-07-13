# BurgerBoy

BurgerBoy es un juego de gestión de restaurante desarrollado con PixiJS.

El jugador debe recibir pedidos, preparar comida, administrar clientes y mantener el flujo del restaurante funcionando correctamente antes de que el estrés llegue a niveles críticos.

---

# Características Implementadas

## Jugador

- Movimiento top-down.
- Colisiones con el escenario.
- Sistema de interacción.
- Animaciones según el objeto transportado.
- Bandejas/Bolsas para transportar pedidos.

---

## Cocina

### Item Processor

- Procesamiento de comida.
- Sistema de cocción por tiempo.
- Barra de progreso reutilizable.
- Conversión automática de ingredientes crudos a cocidos.

### Items

- Comida cruda.
- Comida cocida.
- Bebidas.
- Bandejas.

---

## Selector Radial

- Selección contextual de acciones.
- Compatible con múltiples tipos de estaciones.
- Sistema de bloqueo visual para opciones no disponibles.

---

## NPCs

### Sistema de Pool

- Reutilización de NPCs.
- Respawn con cooldown aleatorio.
- Spawn inicial escalonado.

### Máquina de Estados (FSM)

Estados implementados:

- Walking
- Queue
- Leaving

### Hambre

- La hambre aumenta con el tiempo.
- La hambre continúa aumentando incluso cuando el NPC está fuera de pantalla.
- Los NPCs pueden reaparecer con distintos niveles de hambre.
- Al abandonar el restaurante por impaciencia, el hambre se reinicia.

### Paciencia

- Sistema completo de paciencia.
- La paciencia disminuye mientras el cliente espera.
- Al tomar un pedido la paciencia se recupera parcialmente.
- Si la paciencia llega a cero:
  - El cliente abandona la fila.
  - El pedido se cancela.
  - La tarjeta del pedido desaparece.
  - El NPC abandona el local.

### Barras de Paciencia

- Barra visual sobre los NPCs.
- Visible únicamente mientras el NPC está esperando.
- Implementada utilizando el sistema reutilizable `ProgressBar`.

---

## Pedidos

### Sistema de Pedidos

- Generación aleatoria de pedidos.
- Toma de pedidos.
- Validación de pedidos entregados.
- Entrega de pedidos.

### Order Board

- Visualización de pedidos activos.
- Creación automática de Order Cards.
- Eliminación automática al:
  - Entregar correctamente.
  - Cancelar por impaciencia.

---

## UI

### ProgressBar

Componente reutilizable utilizado para:

- Cocción.
- Paciencia.

Características:

- Soporte para Graphics.
- Soporte para barras basadas en Sprites.
- Actualización mediante porcentaje (`0` a `1`).

---

# Arquitectura

## Entity

Responsabilidades:

- Posición lógica.
- Hitbox.
- Transformaciones.

Estructura:

```text
Entity
└─ Container
   └─ View
```

---

## Character

Responsabilidades:

- Movimiento.
- Animaciones.
- Colisiones.

---

## Player

Responsabilidades:

- Transporte de items.
- Interacciones.
- Selección de animaciones según objeto transportado.

---

## NPC

Responsabilidades:

- Hambre.
- Paciencia.
- Estados.
- Pedidos.
- Cooldowns de respawn.

---

## NPCSystem

Responsabilidades:

- Spawn y respawn.
- Entrada a filas.
- Manejo de paciencia.
- Salida de clientes.
- Coordinación general de NPCs.

---

## QueueSystem

Responsabilidades:

- Cola para realizar pedidos.
- Cola de espera de pedidos.
- Reorganización automática de posiciones.

---

## OrderSystem

Responsabilidades:

- Tomar pedidos.
- Validar pedidos.
- Entregar pedidos.
- Crear y eliminar Order Cards.

---

# TODO (Corto Plazo)

## NPCs

### Corregir inicio de paciencia

Actualmente:

```text
Entra a la fila
↓
Comienza a perder paciencia
```

Deseado:

```text
Entra a la fila
↓
Llega a su posición
↓
Comienza a perder paciencia
```

No es crítico actualmente.

---

### Separación entre NPCs

Implementar separación básica para evitar superposición entre clientes.

---

## Radial Menu

### Modo Automático

Actualmente:

```text
Seleccionar opción
↓
Interactuar
↓
Ejecutar acción
```

Agregar opción para:

```text
Seleccionar opción
↓
Ejecutar acción automáticamente
```

Mediante configuración:

```js
RADIAL_REQUIRES_CONFIRM = true
```

o

```js
AUTO_CONFIRM_RADIAL = true
```

---

# Próximos Sistemas

## Stress System

Cuando un cliente abandona el restaurante:

```text
Paciencia = 0
↓
Abandona
↓
Stress +
```

Características futuras:

- Barra visual de estrés.
- Condición de derrota.
- Penalizaciones por clientes perdidos.

---

## Barras Visuales Definitivas

Migrar completamente a barras con sprites para:

- Paciencia.
- Vida.
- Estrés.
- Cocción.

---

# Futuro

## Drive Thru

- Vehículos.
- Cola de vehículos.
- Pedidos para autos.
- Entregas en ventanilla.

---

## Clientes Especiales

- Impacientes.
- Pacientes.
- VIP.

---

## Economía

- Dinero.
- Costos.
- Ganancias.
- Mejoras del restaurante.

---
`
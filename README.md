# 🍔 BurgerBoy

Juego de gestión de restaurante inspirado en títulos como **Overcooked**, donde el jugador debe cocinar, preparar pedidos, gestionar clientes y sobrevivir hasta el final de la jornada laboral.

Actualmente el proyecto se encuentra en desarrollo y está siendo construido con una arquitectura modular basada en entidades, estaciones de trabajo, máquinas de estados para NPCs y sistemas independientes para interacción, navegación y debug.

---

# 🎮 Gameplay

El jugador deberá:

1. Tomar pedidos de los clientes.
2. Obtener ingredientes.
3. Cocinar hamburguesas y papas.
4. Servir bebidas.
5. Armar pedidos completos en una bandeja.
6. Entregar pedidos correctamente.
7. Atender clientes antes de que se impacienten.
8. Ganar dinero.
9. Gestionar el estrés del restaurante.
10. Sobrevivir hasta el final del día.

---

# 🎯 Condiciones de Victoria

- Sobrevivir hasta el final de la jornada.
- Mantener el estrés por encima de 0.
- Conseguir la mayor cantidad de dinero posible.

# 💀 Condiciones de Derrota

- El estrés llega a 0.
- El restaurante colapsa por acumulación de errores y clientes desatendidos.

---

# 🚧 Roadmap (MVP)

## Pedidos y Clientes

- [x] Implementar trigger de entrega.
- [x] Entregar bandejas a clientes.
- [x] Validar pedidos.
- [ ] Mostrar pedidos visualmente.
- [ ] Mostrar barra de paciencia sobre clientes.
- [ ] Mostrar pedidos sobre clientes.
- [x] Implementar estado `Leaving`.
- [x] Los clientes abandonan el local después de recibir el pedido.

---

## Sistema de Hambre

- [x] Hambre para NPCs.
- [x] Reducir hambre al recibir el pedido.
- [ ] Mantener hambre aumentando fuera de pantalla.
- [ ] Cooldown de reaparición para cada NPC.
- [ ] Spawn inicial escalonado.
- [ ] Evitar reapariciones excesivamente frecuentes.
- [ ] Permitir futuras condiciones de entrada (dinero, horarios, etc.).

---

## Economía

- [ ] Sistema de dinero.
- [ ] Precio para cada producto.
- [ ] Cálculo del valor total de una bandeja.
- [ ] Recompensa económica al entregar pedidos.
- [ ] Soporte para ingredientes adicionales con valor agregado.

---

## Tiempo

- [ ] Implementar reloj del juego.
- [ ] Hora de inicio de la jornada.
- [ ] Hora de finalización de la jornada.

---

## Estrés (Vida)

- [ ] Sistema de estrés.
- [ ] Barra visual.
- [ ] Penalización por pedidos perdidos.
- [ ] Penalización por clientes acumulados.
- [ ] Penalización por errores de cocina.

---

## Navegación e IA

- [ ] Implementar Steering Behaviors (Separation).
- [ ] Evitar que los NPC se atraviesen entre sí.
- [ ] Evitar colisiones entre vehículos.
- [ ] Evitar colisiones entre peatones y vehículos.
- [ ] Ajuste de radios de separación.
- [ ] Mejorar sistema de triggers.

---

## Cocina

- [x] Variantes de gaseosas mediante selector radial.
- [x] Preparación completa de pedidos.
- [x] Cocción de ingredientes crudos.
- [x] Entrega de pedidos completos.
- [ ] Agregar estado `burned`.
- [ ] Consecuencias por servir comida quemada.
- [ ] Nuevas recetas.
- [ ] Ingredientes adicionales.

---

## UI y Menús

- [ ] Pantalla inicial.
- [x] Selector radial de productos.
- [x] Navegación mediante WASD.
- [x] Confirmación mediante tecla de acción.
- [x] Cancelación mediante ESC.
- [x] Visualización de items dentro del selector.
- [x] Bloqueo de movimiento durante menús.
- [ ] Sistema genérico de navegación de menús.
- [ ] Mostrar pedidos visualmente.

---

## Visual

- [ ] Corregir sistema de Z-Index.
- [ ] Dividir pared izquierda.
- [ ] Dividir pared inferior.
- [ ] Dividir sprite de estación de bandejas.
- [ ] Dividir sprite del tacho de basura.
- [ ] Permitir ocultamiento parcial detrás de objetos.
- [ ] Reemplazar ProgressBar temporal por sprites.

---

# 🚗 Vehículos

## Drive Thru

- [ ] Crear NPC tipo vehículo.
- [ ] Pool de vehículos.
- [ ] Waypoints de entrada.
- [ ] Waypoints de salida.
- [ ] Sistema de fila para vehículos.
- [ ] Ventanilla de pedidos.
- [ ] Ventanilla de entrega.
- [ ] Integrar cliente dentro del vehículo.
- [ ] Trigger frontal para evitar colisiones.
- [ ] Detección de vehículos delante.
- [ ] Detección de peatones delante.
- [ ] Integración con el sistema de pedidos.

---

# ⭐ Futuras Mejoras

## Satisfacción de Clientes

- [ ] Tiempo máximo de espera.
- [ ] Cálculo de satisfacción.

### Estados

| Estado | Rango |
|----------|----------|
| 🙂 Feliz | > 50% |
| 😐 Neutral | 20% - 50% |
| 😡 Enojado | < 20% |

---

## Globos de Diálogo

- [ ] Mostrar pedido solicitado.
- [ ] Mostrar satisfacción.
- [ ] Mostrar mensajes contextuales.

---

## Grim Reaper

- [ ] Agregar personaje "Muerte".
- [ ] Aumentar visibilidad según el nivel de estrés.
- [ ] Aparición progresiva cerca de la derrota.

---

## Gameplay Avanzado

- [ ] Clientes VIP.
- [ ] Bonificaciones por velocidad.
- [ ] Combos de pedidos.
- [ ] Penalización por demoras.
- [ ] Música dinámica.

---

# ✅ Implementado

## Jugador

- [x] Movimiento.
- [x] Sistema de colisiones.
- [x] Interacción con estaciones.
- [x] Inventario simple de un slot.
- [x] Animaciones por dirección.
- [x] Animaciones según item transportado.

---

## Mundo

- [x] Sistema de colliders.
- [x] Sistema de triggers.
- [x] Debug visual de colliders.
- [x] Debug visual de triggers.

---

## Pedidos

- [x] Sistema de pedidos.
- [x] Toma de pedidos.
- [x] Generación aleatoria de órdenes.
- [x] Órdenes con gaseosas aleatorias.
- [x] Validación de pedidos.
- [x] Entrega de pedidos.
- [x] Trigger de entrega.
- [x] Sistema de bandejas.
- [x] Restauración de bandejas en estación de armado.

---

## Cocina

- [x] Heladera.
- [x] Freidora.
- [x] Cocina.
- [x] Dispenser de bebidas.
- [x] Bandeja de armado de pedidos.
- [x] Tacho de basura.
- [x] Sistema genérico de procesamiento de items.
- [x] Estados `raw`.
- [x] Estados `cooked`.
- [x] Estados `served`.
- [x] ProgressBar de cocción.
- [x] Sistema centralizado de ITEMS.
- [x] Visualización de items con sprites.
- [x] Conversión RAW → COOKED.
- [x] Conversión COOKED → SERVED.
- [x] Selector radial de productos.
- [x] Selección de hamburguesas y papas.
- [x] Selección de variantes de gaseosas.
- [x] Preparación completa de todos los pedidos disponibles.

---

## Arquitectura

- [x] Sistema de entidades.
- [x] Estaciones de trabajo reutilizables.
- [x] Separación entre WorkStations e Items.
- [x] Factories para generación de objetos.
- [x] Sistema de configuración por templates.
- [x] Configuración centralizada de items.
- [x] Sistema de navegación basado en waypoints.

---

## NPCs

- [x] Pool de NPCs.
- [x] FSM (Finite State Machine).
- [x] Estado Walking.
- [x] Estado Queue.
- [x] Estado Leaving.
- [x] Sistema de hambre.
- [x] Reducción de hambre al recibir pedidos.
- [x] Sistema de filas.
- [x] Fila de pedidos.
- [x] Fila de espera.
- [x] Waypoints de navegación.
- [x] Generación de órdenes aleatorias.
- [x] Movimiento por waypoints.
- [x] Control de capacidad máxima de filas.
- [x] Avance automático de la fila.
- [x] Consumo de pedidos.
- [x] Abandono del local tras recibir el pedido.

---

## Visual

- [x] Sprites personalizados para comida.
- [x] Sprites personalizados para bebidas.
- [x] Sprites en estaciones de procesamiento.
- [x] Sprites en bandeja de armado.
- [x] Selector radial visual.

---

## Debug

- [x] Visualización de hitboxes.
- [x] Visualización de estados.
- [x] Visualización de waypoints.
- [x] Visualización de rutas.
- [x] Visualización de posiciones de fila.
- [x] Toggle de debug mediante teclado.
- [x] Herramientas de inspección desde `window.debug`.
- [x] Toggle de debug con la letra "G"

---

# 🔥 Próximos Objetivos

1. Mostrar pedidos visualmente.
2. Implementar barra de paciencia para clientes.
3. Implementar Steering Behaviors (Separation).
4. Sistema de dinero.
5. Cooldown de respawn para clientes.
6. Sistema de estrés.
7. Reloj del juego.
8. Drive Thru.

---
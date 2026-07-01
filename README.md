# 🍔 BurgerBoy

Roadmap hecho con COPILOT donde le indique lo que ya hice y lo que quiero hacer a si puedo mostrar bien donde estoy parado.

Juego de gestión de restaurante inspirado en títulos como **Overcooked**, donde el jugador debe cocinar, preparar pedidos, gestionar clientes y sobrevivir hasta el final de la jornada laboral.

Actualmente el proyecto se encuentra en desarrollo y está siendo construido con una arquitectura modular basada en entidades, estaciones de trabajo, máquinas de estados para NPCs y sistemas independientes para interacción, navegación y debug.

---

# 🎮 Gameplay

El jugador deberá:

1. Obtener ingredientes.
2. Cocinar hamburguesas y papas.
3. Servir bebidas.
4. Armar pedidos completos en una bandeja.
5. Atender clientes antes de que se impacienten.
6. Ganar dinero.
7. Gestionar el estrés del restaurante.
8. Sobrevivir hasta el final del día.

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

- [ ] Implementar trigger de entrega.
- [ ] Entregar bandejas a clientes.
- [ ] Validar pedidos.
- [ ] Mostrar pedidos visualmente.
- [ ] Implementar estado `Leaving`.
- [ ] Los clientes abandonan el local después de recibir el pedido.
- [ ] Avance automático de filas al liberarse espacio.

---

## Sistema de Hambre

- [ ] Reducir hambre al comer.
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
- [ ] Ajuste de radios y separación.
- [ ] Mejorar sistema de triggers.

---

## Cocina

- [ ] Implementar tacho de basura.
- [ ] Descartar cualquier item.
- [ ] Agregar estado `burned`.
- [ ] Consecuencias por servir comida quemada.

---

## Arte

- [ ] Reemplazar placeholders por sprites.
- [ ] Reemplazar ProgressBar temporal por sprites.
- [ ] Reemplazar animaciones temporales del jugador.

---

## Productos

- [ ] Variantes de gaseosas.
- [ ] Nuevas recetas.
- [ ] Ingredientes adicionales.

---

# 🚗 Vehículos

## Autos

- [ ] Crear NPC tipo vehículo.
- [ ] Pool de vehículos.
- [ ] Integrar cliente dentro del vehículo.
- [ ] Trigger frontal para evitar colisiones.
- [ ] Detección de vehículos y peatones delante.
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

---

## Mundo

- [x] Sistema de colliders.
- [x] Sistema de triggers.
- [x] Debug visual de colliders.
- [x] Debug visual de triggers.

---

## Cocina

- [x] Heladera.
- [x] Freidora.
- [x] Cocina.
- [x] Dispenser de bebidas.
- [x] Bandeja de armado de pedidos.
- [x] Sistema genérico de procesamiento de items.
- [x] Sistema de estados (`raw`, `cooked`).
- [x] ProgressBar de cocción.
- [x] Sistema basado en `ItemTemplates`.

---

## Arquitectura

- [x] Sistema de entidades.
- [x] Estaciones de trabajo reutilizables.
- [x] Separación entre WorkStations e Items.
- [x] Factories para generación de objetos.
- [x] Sistema de configuración por templates.

---

## NPCs

- [x] Pool de NPCs.
- [x] FSM (Finite State Machine).
- [x] Estado Walking.
- [x] Estado Queue.
- [x] Sistema de hambre.
- [x] Sistema de filas.
- [x] Fila de pedidos.
- [x] Fila de espera.
- [x] Waypoints de navegación.
- [x] Generación de órdenes aleatorias.
- [x] Control de capacidad máxima de filas.

---

## Debug

- [x] Visualización de hitboxes.
- [x] Visualización de estados.
- [x] Visualización de waypoints.
- [x] Visualización de rutas.
- [x] Visualización de posiciones de fila.
- [x] Herramientas de inspección desde `window.debug`.

---

# 🔥 Próximos Objetivos

1. Sistema de entrega.
2. Validación de bandejas.
3. Estado `Leaving`.
4. Sistema de dinero.
5. Sistema de estrés.
6. Reloj del juego.
7. Condiciones de victoria y derrota.
8. Separation para NPCs.
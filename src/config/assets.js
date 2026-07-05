const BASE_NPC_PATH = "./assets/characters/npcs"
const BASE_WORKSTATIONS = "./assets/workStations"
const BASE_HUD = "./assets/HUD"
const BASE_PROPS = "./assets/props"
const BASE_MAP = "./assets/map"


export const ASSETS = {
    MAP: {
        MAP:`${BASE_MAP}/escenario.png`,
        DRIVE_THRU_SIGNAL: `${BASE_MAP}/cartel_drive_thru.png`,
        AWNING: `${BASE_MAP}/toldo.png`,
        RED_CLOCK: `${BASE_MAP}/reloj_rojo.png`,
        GREEN_CLOCK: `${BASE_MAP}/reloj_verde.png`,
        TRIGGERS: `./assets/triggers/zonas_interaccion.png`,
    },
    NPCS: {
        NPC_01: `${BASE_NPC_PATH}/npc_01/npc_1.json`,
        NPC_02: `${BASE_NPC_PATH}/npc_02/npc_2.json`,
        NPC_03: `${BASE_NPC_PATH}/npc_03/npc_3.json`,
        NPC_04: `${BASE_NPC_PATH}/npc_04/npc_4.json`,
        NPC_05: `${BASE_NPC_PATH}/npc_05/npc_5.json`,
        NPC_06: `${BASE_NPC_PATH}/npc_06/npc_6.json`,
        NPC_07: `${BASE_NPC_PATH}/npc_07/npc_7.json`,
        NPC_08: `${BASE_NPC_PATH}/npc_08/npc_8.json`,
        NPC_09: `${BASE_NPC_PATH}/npc_09/npc_9.json`,
        NPC_10: `${BASE_NPC_PATH}/npc_10/npc_10.json`,
        NPC_11: `${BASE_NPC_PATH}/npc_11/npc_11.json`,
        NPC_12: `${BASE_NPC_PATH}/npc_12/npc_12.json`,
        NPC_13: `${BASE_NPC_PATH}/npc_13/npc_13.json`,
    },
    PLAYER: "./assets/characters/player/player.json",
    STATIC_OBJECTS: {
        fridge: `${BASE_WORKSTATIONS}/heladera.png`,
        fryer: `${BASE_WORKSTATIONS}/freidora.png`,
        oven: `${BASE_WORKSTATIONS}/cocina.png`,
        soda: `${BASE_WORKSTATIONS}/expendedora_gaseosas.png`,
        tray: `${BASE_WORKSTATIONS}/mesa_de_armado.png`,
        thrash: `${BASE_WORKSTATIONS}/cesto.png`,
        computer: `${BASE_WORKSTATIONS}/computadora.png`,
        delivery_counter: `${BASE_WORKSTATIONS}/tabla_de_entrega.png`,
    },
    PROPS:{
        yellow_soda: `${BASE_PROPS}/bebida_amarilla.png`,
        blue_soda: `${BASE_PROPS}/bebida_celeste.png`,
        red_soda: `${BASE_PROPS}/bebida_roja.png`,
        green_soda: `${BASE_PROPS}/bebida_verde.png`,
        cooked_burger: `${BASE_PROPS}/hamburguesa_cocida.png`,
        raw_burger: `${BASE_PROPS}/hamburguesa_cruda.png`, 
        order_burger: `${BASE_PROPS}/orden_hamburguesa.png`,
        order_fries: `${BASE_PROPS}/orden_papas_fritas.png`,
        raw_fries: `${BASE_PROPS}/papas_crudas.png`,
        cooked_fries: `${BASE_PROPS}/papas_fritas.png`,

    }
}
import { ASSETS } from "./assets.js"

export const ITEMS = {

    RAW_BURGER: {
        id: "raw_burger",
        type: "burger",
        state: "raw",
        asset: ASSETS.PROPS.raw_burger,
        cookTime: 200
    },

    COOKED_BURGER: {
        id: "cooked_burger",
        type: "burger",
        state: "cooked",
        asset: ASSETS.PROPS.cooked_burger
    },

    SERVED_BURGER: {
        id: "served_burger",
        type: "burger",
        state: "served",
        asset: ASSETS.PROPS.served_burger
    },

    RAW_FRIES: {
        id: "raw_fries",
        type: "fries",
        state: "raw",
        asset: ASSETS.PROPS.raw_fries,
        cookTime: 150
    },

    COOKED_FRIES: {
        id: "cooked_fries",
        type: "fries",
        state: "cooked",
        asset: ASSETS.PROPS.cooked_fries
    },

    SERVED_FRIES: {
        id: "served_fries",
        type: "fries",
        state: "served",
        asset: ASSETS.PROPS.served_fries
    },

    RED_SODA: {
        id: "red_soda",
        type: "soda",
        variant: "red",
        asset: ASSETS.PROPS.red_soda
    },

    BLUE_SODA: {
        id: "blue_soda",
        type: "soda",
        variant: "blue",
        asset: ASSETS.PROPS.blue_soda
    },

    GREEN_SODA: {
        id: "green_soda",
        type: "soda",
        variant: "green",
        asset: ASSETS.PROPS.green_soda
    },

    YELLOW_SODA: {
        id: "yellow_soda",
        type: "soda",
        variant: "yellow",
        asset: ASSETS.PROPS.yellow_soda
    }
}
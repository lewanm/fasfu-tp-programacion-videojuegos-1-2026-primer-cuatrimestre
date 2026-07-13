import { ITEMS as items } from "./items.js"

export const ORDERS = [
    {
        id: "burger",
        items: [{...items.SERVED_BURGER}]
    },

    {
        id: "burger_soda",
        items: [
            {...items.SERVED_BURGER},
            { id: "random_soda" }
        ]
    },

    {
        id: "burger_fries",
        items: [
            {...items.SERVED_BURGER},
            {...items.SERVED_FRIES},
        ]
    },

    {
        id: "full_menu",
        items: [
            { ...items.SERVED_BURGER },
            { ...items.SERVED_FRIES },
            { id: "random_soda"}
        ]
    },

    {
        id: "gaseosa_papas",
        items: [
            { id: "random_soda"},
            { ...items.SERVED_FRIES},
        ]
    }
]
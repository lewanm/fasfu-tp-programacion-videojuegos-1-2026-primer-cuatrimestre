export const ORDERS = [
    {
        id: "burger",
        items: [
            { type: "burger", state: "cooked" }
        ]
    },

    {
        id: "burger_soda",
        items: [
            { type: "burger", state: "cooked" },
            { type: "soda", variant: "cola" }
        ]
    },

    {
        id: "full_menu",
        items: [
            { type: "burger", state: "cooked" },
            { type: "fries", state: "cooked" },
            { type: "soda", variant: "cola" }
        ]
    }
]
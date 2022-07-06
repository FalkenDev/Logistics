import config from "../config/config.json";
import OrderItem from "../interfaces/order_item";
import Order from "../interfaces/order";
import productsModel from './product';

const orders = {
    // Get all orders
    getOrders: async function getOrders(): Promise<Order[]>{
        console.log("------| Get all orders |------");
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    // Get specific order
    getOrder: async function getOrder(order_id: number) {
        console.log("------| Get specific order |------");
        const response = await fetch(`${config.base_url}/orders/${order_id}?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    // Pick a order ( Kolla igenom denna )
    pickOrder: async function pickOrder(order: Partial<Order>) {
        console.log("------| Pick orders |------");
        console.log(order.order_items)
        await Promise.all(order.order_items.map(async (order_item:
        Partial<OrderItem>) => {
            let updateProduct = {
                id: order_item.product_id,
                name: order_item.name,
                api_key: config.api_key,
                stock: order_item.stock - order_item.amount
            };

            console.log(updateProduct)

            await productsModel.updateProducts(updateProduct);
        }));

        await orders.updateOrderStatus(order);
    },

    // Search specific Order
    getSearchOrder: async function getSearchOrder(name: string) {
        console.log("---| Get all products |---");
        console.log("name");
        console.log(name);

        const response = await fetch(`${config.base_url}/orders/search/${name}?api_key=${config.api_key}`);
        const result = await response.json();

        console.log(result.data);

        return result.data

    },

    // Update a order status
    updateOrderStatus: async function updateOrderStatus(order_info: Partial<Order>) {
        console.log("------| Update order |------");
        function callbackFunction() {
            console.log("Had been loaded");
        }

        var order = {
            id: order_info.id,
            name: order_info.name,
            status_id: order_info.status_id,
            api_key: config.api_key
        };
        var json = JSON.stringify(order);
        console.log("---------------------------------------");
        console.log(order);
        console.log("---------------------------------------");

        var request = new XMLHttpRequest();
        request.addEventListener("load", callbackFunction);
        request.open("PUT", "https://lager.emilfolino.se/v2/orders");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);
        return;
    },
};

export default orders;
import Delivery from '../interfaces/delivery';
import config from '../config/config.json'

const deliveries = {

    // Get all deliveries
    getDeliveries: async function getOrders(): Promise<Delivery[]>{
        console.log("------| Get Deliveries |------");
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    // Add a delivery
    addDelivery: async function addDelivery(delivery: Partial<Delivery>){
        console.log("------| Adding Delivery to API |------");
        function callbackFunction() {
            console.log("------| Deliveries has been loaded |------");
        }

        var deliveryItem = {
            product_id: delivery.product_id,
            amount: delivery.amount,
            delivery_date: delivery.delivery_date,
            comment: delivery.comment,
            api_key: config.api_key
        };

        var json = JSON.stringify(deliveryItem);

        var request = new XMLHttpRequest();
        request.addEventListener("load", callbackFunction);
        request.open("POST", "https://lager.emilfolino.se/v2/deliveries");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);
        return;
    },

    // Delete a delivery
    delDelivery: async function delDelivery(delivery: Partial<Delivery>){
        console.log("------| Deleting Specific Delivery To API |------");
        function callbackFunction() {
            console.log("------| Deliverie has been deleted |------");
        }

        var deliveryItem = {
            product_id: delivery.id,
            api_key: config.api_key
        };

        var json = JSON.stringify(deliveryItem);

        var request = new XMLHttpRequest();
        request.addEventListener("load", callbackFunction);
        request.open("DELETE ", "https://lager.emilfolino.se/v2/deliveries");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);
        return;
    },
}

export default deliveries;
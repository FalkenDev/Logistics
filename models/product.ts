import OrderItem from "../interfaces/order_item";
import config from "../config/config.json";
const products = {
    // Get all produtcs
    getProducts: async function getProducts() {
        console.log("---| Get all products |---");

        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data

    },

    // Get specific produtc
    getSpecificProduct: async function getSpecificProduct(id: number) {
        console.log("---| Get all products |---");

        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data

    },

    // Get specific produtc
    getSearchProduct: async function getSearchProduct(name: string) {
        console.log("---| Get all products |---");
        console.log("name");
        console.log(name);

        const response = await fetch(`${config.base_url}/products/search/${name}?api_key=${config.api_key}`);
        const result = await response.json();

        console.log(result.data);

        return result.data

    },

    // Update specific product
    updateProducts: async function updateProducts(product: Partial<OrderItem>) {
        console.log("Update Products (Products - order products)")
        function callbackFunction() {
            console.log("Products been updated");
        }

        product.api_key = config.api_key;
        console.log("---------------------------------------");
        console.log(product);
        console.log("---------------------------------------");
        var json = JSON.stringify(product);

        var request = new XMLHttpRequest();
        request.addEventListener("load", callbackFunction);
        request.open("PUT", "https://lager.emilfolino.se/v2/products");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);
        return;
    },

    // Delete specific product
    deleteProduct: async function deleteProduct(product: Partial<OrderItem>) {
        console.log("------| Deleting Specific Product To API |------");
        console.log(product);
        function callbackFunction() {
            console.log("------| Product has been deleted |------");
        }

        var productItem = {
            id: product.id,
            api_key: config.api_key
        };

        var json = JSON.stringify(productItem);

        var request = new XMLHttpRequest();
        request.addEventListener("load", callbackFunction);
        request.open("DELETE", "https://lager.emilfolino.se/v2/products");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);
        return;
    },
}

export default products;
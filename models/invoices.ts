import { Item } from "react-native-paper/lib/typescript/components/List/List";
import config from "../config/config.json";
import Invoice from "../interfaces/invoice";
import Order from "../interfaces/order";
import orderModel from "../models/orders";
import storage from "./storage";

const invoices = {
    // Get all invoices
    getInvoices: async function getInvoices(): Promise<Invoice[]>{
        console.log("------| Get Invoices |------");
        const tokenObject: any = await storage.readToken();
        console.log(tokenObject);
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': tokenObject.token
            },
        });
        const result = await response.json();
        console.log(result);
        return result.data;
    },

    // Add invoice
    addInvoice: async function addInvoice(invoiceObject: Partial<Invoice>) {
        console.log("------| Adding Invoice to API |------");
        console.log("   ▲_____| Updating order status to 600 / Fakturerad |------");
        let order = await orderModel.getOrder(invoiceObject.order_id);
        console.log(order);
        order.status_id = 600;
        orderModel.updateOrderStatus(order);

        let totalSum = 0;
        order.order_items.forEach((oi: any) => {
            totalSum += oi.amount * oi.price;
        })

        let dueDate = new Date(invoiceObject.creation_date);
        dueDate.setDate(dueDate.getDate() + 30);

        invoiceObject.due_date = dueDate.toLocaleDateString();
        invoiceObject.total_price = totalSum;
        invoiceObject.api_key = config.api_key;

        const tokenObject: any = await storage.readToken();

        try {
            const respons = await fetch(`${config.base_url}/invoices`, {
            body: JSON.stringify(invoiceObject),
            headers: {
                'content-type': 'application/json',
                'x-access-token': tokenObject.token
            },
            method:'POST'
        });
        } catch (error) {
            console.log(error);
        }
    },
};

export default invoices;
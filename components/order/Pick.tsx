import { View, Text, Pressable, Image, ScrollView, Animated} from "react-native";
import { useState, useEffect } from 'react';
import { Base, Typography, DashboardStyle, StockStyle, OrderStyle } from '../../styles/index.js';
import { FontAwesome5, MaterialIcons, Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import backgroundImage from "../../assets/androidback.png"; //Byt ut
import { DataTable } from 'react-native-paper';
import orderModel from '../../models/orders';
import Blink from '../../styles/blink'; // Blink function Not work well ATM
import productModel from "../../models/product";

export default function InfoList({ route, navigation, setProducts }) {
    console.log("Product Info");
    const { order } = route.params;
    let orderItems;
    const [amountPressed, setAmountPressed] = useState(0);
    let orderItemLength = order.order_items.length;

    let orderStatusArray = orderModel.orderStatusFunction(order.status_id);
    let statusBackgroundColor = orderStatusArray[0];
    let statusName = orderStatusArray[1];

    async function pick() {
        order.status_id = 200;
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    let allInStock = true;
    

    return (
        <ScrollView style={{backgroundColor: "white"}}>
            <View style={{height: 160, backgroundColor: "#040C33",}}>
                <FontAwesome5 style={DashboardStyle.logo} name="box" size={60} color="white" />
            </View>
            <View style={{flex: 1, flexDirection: "row", height: 15, backgroundColor: "#20241F", borderWidth: 2, borderColor: "white"}}>
                <View style={{width: "25%", backgroundColor: "#30FF1E", borderRightWidth: 2, borderColor: "white"}}></View>
                <Blink></Blink>
                <View style={{width: "25%", backgroundColor: "#20241F", borderRightWidth: 2, borderLeftWidth: 2, borderColor: "white"}}></View>
                <View style={{width: "25%", backgroundColor: "#20241F"}}></View>
            </View>
            <View  style={OrderStyle.details_statusTextView}>
                <Text style={{width: "25%", textAlign: "center"}}>Accepted</Text>
                <Text style={{width: "25%", textAlign: "center"}}>Packed</Text>
                <Text style={{width: "25%", textAlign: "center"}}>Sent</Text>
                <Text style={{width: "25%", textAlign: "center"}}>Delivered</Text>
            </View>
            <View>
                <Text>ITEMS TO PICK:</Text>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{flex: 1.3}}>#</DataTable.Title>
                        <DataTable.Title style={{flex: 1.3}}>ArticleNr</DataTable.Title>
                        <DataTable.Title style={{flex: 1.8}}>Name</DataTable.Title>
                        <DataTable.Title style={{flex: 1}}>Amount</DataTable.Title>
                        <DataTable.Title style={{flex: 0.4}}></DataTable.Title>
                    </DataTable.Header>
                </DataTable>
                {orderItems = order.order_items.map((item, index) => {
                    const [pressed, setPressed] = useState(false);
                    if (item.stock < item.amount) {
                        allInStock = false;
                    }
                    return (
                        <Pressable key={index} onPress={() => { if(pressed) {setPressed(false); setAmountPressed(amountPressed - 1)} else{setPressed(true); setAmountPressed(amountPressed + 1)} }}>
                            <DataTable.Row style={{height: 90}}>
                                <DataTable.Cell style={{flex: 1.4}}><View style={StockStyle.rectangle}><FontAwesome5 style={DashboardStyle.logo} name="box" size={30} color="white" /></View></DataTable.Cell>
                                <DataTable.Cell style={{flex: 1.3}}>{item.article_number}</DataTable.Cell>
                                <DataTable.Cell style={{flex: 1.8}}>{item.name}</DataTable.Cell>
                                <DataTable.Cell style={{flex: 1}}>{item.amount}</DataTable.Cell>
                                {pressed
                                    ?<DataTable.Cell style={{flex: 0.4}}><AntDesign name="checksquareo" size={22} color="black" /></DataTable.Cell>
                                    :<DataTable.Cell style={{flex: 0.4}}><Ionicons name="ios-square-outline" size={24} color="black"/></DataTable.Cell>
                                }
                                
                            </DataTable.Row>
                        </Pressable>
                    )
                })}
            </View>
            <View style={{display: "flex"}}>
                {orderItemLength === amountPressed && allInStock === true
                    ?<Pressable onPress={pick} style={{width: "94%",height: 40,backgroundColor: "#72FF70",borderRadius: 5,alignSelf: "center",marginTop: 10,marginBottom: 10}}><Text style={StockStyle.details_button_text}>Pick</Text></Pressable>
                    :<Pressable disable={true} style={{width: "94%",height: 40,backgroundColor: "#BDFEBB",borderRadius: 5,alignSelf: "center",marginTop: 10,marginBottom: 10}}><Text style={StockStyle.details_button_text}>Pick</Text></Pressable>
                }
            </View>
        </ScrollView>
    )
    
}
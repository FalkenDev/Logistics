import { useCallback, useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, Button, StyleSheet, Pressable, View } from "react-native";
import { Typography, Base, OrderStyle, DashboardStyle } from '../../styles/index.js';
import orderModel from "../../models/orders";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import SearchBar from "react-native-dynamic-search-bar";
import { DataTable } from 'react-native-paper';

export default function OrderList({ route, navigation, orders, setOrders }) {
    console.log("------| Loading Orders from Order |------")
    let ordersLength = orders.length;
    const [searchOrders, setSearchOrders] = useState([]);
    let statusBackgroundColor = '#FF0000';
    let statusName ='Error';

    useEffect(() => {
        (async () => {
            setOrders(await orderModel.getOrders());
            setSearchOrders(orders);
        })();
    }, []);

    let listOfSearchOrders;

    async function searchFunction(name: string) {
        if(name === "") {
            setSearchOrders(orders);
        } else {
            setSearchOrders( await orderModel.getSearchOrder(name))
        }
    }

    async function orderStatusFunction(orderStatus: number) {
        if(orderStatus === 100) /* New */ {
            statusBackgroundColor = '#FCFF51';
            statusName = 'New';
        } else if(orderStatus === 200) /* Packed */ {
            statusBackgroundColor = '#FF636C';
            statusName = 'Packed';
        } else if(orderStatus === 400) /* Sent */ {
            statusBackgroundColor = '#44FF4B';
            statusName = 'Sent';
        } else if(orderStatus === 600) /* Invoiced */ {
            statusBackgroundColor = '#6951FF';
            statusName = 'Invoiced';
        } else if(orderStatus === 800) /* Return */ {
            statusBackgroundColor = '#49FFFF';
            statusName = 'Return';
        } else if(orderStatus === 900) /* Refunded */ {
            statusBackgroundColor = '#FF80DB';
            statusName = 'Refunded';
        }
    }

    return (
        <ScrollView style={{backgroundColor: "white"}}>
            <SearchBar style={{marginTop: 20, borderBottomColor: "grey", borderBottomWidth: 1}}
                placeholder="Search here"
                onPress={() => setSearchOrders(orders)}
                onChangeText={(text) => searchFunction(text)}
                onClearPress={() => setSearchOrders(orders)}
            />
            <View style={{marginLeft: "auto", marginRight: "auto"}}>
                <View style={OrderStyle.container}>
                    <View style={OrderStyle.stockContainerLogo}>
                        <View style={OrderStyle.circle}><FontAwesome5 style={DashboardStyle.logo} name="box" size={28} color="white" /></View>
                    </View>
                    <View style={OrderStyle.stockContainerText}>
                        <Text style={OrderStyle.textNumber}>{ordersLength}</Text>
                        {ordersLength === 1
                        ?<Text style={OrderStyle.textInfo}>Active Order</Text>
                        :<Text style={OrderStyle.textInfo}>Active Orders</Text>
                        }
                    </View>
                </View>
            </View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{flex: 1.1}}>ID</DataTable.Title>
                    <DataTable.Title style={{flex: 3}}>Name</DataTable.Title>
                    <DataTable.Title style={{flex: 1.4}}>Items</DataTable.Title>
                    <DataTable.Title style={{flex: 1}}>Status</DataTable.Title>
                    <DataTable.Title style={{flex: 0.4}}></DataTable.Title>
                </DataTable.Header>
            </DataTable>
            { listOfSearchOrders = searchOrders
            .map((order, index) => {
                let orderItemLength = order.order_items.length
                orderStatusFunction(order.status_id);
                return (
                    <Pressable key={index} onPress={() => { navigation.navigate('Details', {order: order}); }}>
                        <DataTable.Row style={{height: 90}}>
                            <DataTable.Cell style={{flex: 1.1}}><Text style={{color: "blue"}}>#{order.id}</Text></DataTable.Cell>
                            <DataTable.Cell style={{flex: 3}}>{order.name}</DataTable.Cell>
                            <DataTable.Cell style={{flex: 1.4}}>{orderItemLength}</DataTable.Cell>
                            <View style={{...OrderStyle.statusBar, backgroundColor: statusBackgroundColor}}>
                                <DataTable.Cell style={{flex: 1}}>
                                    <Text style={OrderStyle.statusBarText}>{statusName}</Text>
                                </DataTable.Cell>
                            </View>
                            <DataTable.Cell style={{flex: 0.4}}><MaterialIcons name="arrow-forward-ios" size={14} color="black" /></DataTable.Cell>
                        </DataTable.Row>
                    </Pressable>
                )
            })
            }
        </ScrollView>
    );
}


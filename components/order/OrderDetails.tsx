import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useState, useEffect } from 'react';
import { Base, Typography, DashboardStyle, StockStyle } from '../../styles/index.js';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import backgroundImage from "../../assets/androidback.png"; //Byt ut
import { DataTable } from 'react-native-paper';

export default function InfoList({ route, navigation, setProducts }) {
    console.log("Product Info");
    const { order } = route.params;
    let orderItems;
    let statusBackgroundColor;
    let statusName;


    async function orderStatusFunction(orderStatus: number) {
        console.log(orderStatus);
        if(orderStatus === 100) /* New */ {
            statusBackgroundColor = '#FCFF51';
            statusName = 'Accepted';
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

    orderStatusFunction(order.status_id);

    return (
        <ScrollView style={{backgroundColor: "white"}}>
            <View style={{height: 160, backgroundColor: "#040C33",}}>
                <FontAwesome5 style={DashboardStyle.logo} name="box" size={60} color="white" />
            </View>
            <View style={{flex: 1, flexDirection: "row", height: 15}}>
                <View style={{width: "25%", backgroundColor: "#30FF1E", borderWidth: 2, borderColor: "white"}}></View>
                <View style={{width: "25%", backgroundColor: "#20241F", borderWidth: 2, borderColor: "white"}}></View>
                <View style={{width: "25%", backgroundColor: "#20241F", borderWidth: 2, borderColor: "white"}}></View>
                <View style={{width: "25%", backgroundColor: "#20241F", borderWidth: 2, borderColor: "white"}}></View>
            </View>
            <View style={{flex: 1, flexDirection: "row", marginBottom: 20}}>
                <Text style={{width: "25%", textAlign: "center"}}>Accepted</Text>
                <Text style={{width: "25%", textAlign: "center"}}>Packed</Text>
                <Text style={{width: "25%", textAlign: "center"}}>Sent</Text>
                <Text style={{width: "25%", textAlign: "center"}}>Delivered</Text>
            </View>
            <View>
                <Text style={StockStyle.details_text_title}>Order ID</Text>
                <Text style={StockStyle.details_text_output}>{order.id ?? "None"}</Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Name</Text>
                <Text style={StockStyle.details_text_output}>{order.name ?? "None"}</Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Address</Text>
                <Text style={StockStyle.details_text_output}>{order.address ?? "None"}</Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Zip code</Text>
                <Text style={StockStyle.details_text_output}>{order.zip ?? "None"}</Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>City</Text>
                <Text style={StockStyle.details_text_output}>{order.city ?? "None"}</Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Country</Text>
                <Text style={StockStyle.details_text_output}>{order.country ?? "None"}</Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Status</Text>
                <Text style={StockStyle.details_text_output}>{statusName}</Text>
            </View>
            <View>
                <Pressable style={StockStyle.details_button_edit}>
                    <Text style={StockStyle.details_button_text}>Orders is ready to be picked</Text>
                </Pressable>
            </View>
            <View>
                <Text>Items:</Text>
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
                    return (
                        <Pressable key={index} onPress={() => { navigation.navigate('Details', {item: item}); }}>
                            <DataTable.Row style={{height: 90}}>
                                <DataTable.Cell style={{flex: 1.4}}><View style={StockStyle.rectangle}><FontAwesome5 style={DashboardStyle.logo} name="box" size={30} color="white" /></View></DataTable.Cell>
                                <DataTable.Cell style={{flex: 1.3}}>{item.article_number}</DataTable.Cell>
                                <DataTable.Cell style={{flex: 1.8}}>{item.name}</DataTable.Cell>
                                <DataTable.Cell style={{flex: 1}}>{item.amount}</DataTable.Cell>
                                <DataTable.Cell style={{flex: 0.4}}><MaterialIcons name="arrow-forward-ios" size={14} color="black" /></DataTable.Cell>
                            </DataTable.Row>
                        </Pressable>
                    )
                })}
            </View>
            <View style={{display: "flex"}}>
                <Pressable style={StockStyle.details_button_edit}><Text style={StockStyle.details_button_text}>Pick</Text></Pressable>
                <Pressable style={StockStyle.details_button_edit}><Text style={StockStyle.details_button_text}>Cancel order</Text></Pressable>
            </View>
        </ScrollView>
    )
    
}
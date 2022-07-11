import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useState, useEffect } from 'react';
import { Base, Typography,DashboardStyle, StockStyle } from '../../styles/index.js';
import backgroundImage from "../../assets/androidback.png"; //Byt ut
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { header2 } from "../../styles/typography.js";
import Stock from "./Stock.js";

export default function InfoList({ route, navigation, setProducts }) {
    console.log("Product Info");
    const { item } = route.params;

    return (
        <ScrollView>
            <View style={StockStyle.details_header}>
                <FontAwesome5 style={DashboardStyle.logo} name="box" size={60} color="white" />
            </View>
            <View>
                <Text style={StockStyle.details_text_title}>Name</Text>
                <Text style={StockStyle.details_text_output}>{item.name}</Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>ID</Text>
                <Text style={StockStyle.details_text_output}><Text style={StockStyle.details_text_id}>#{item.id}</Text></Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Article number</Text>
                <Text style={StockStyle.details_text_output}>{item.article_number}</Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Description</Text>
                <Text style={StockStyle.details_text_output}>{item.description ?? "None"}</Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Specifiers</Text>
                <Text style={StockStyle.details_text_output}>{item.specifiers ?? "None"}</Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Stock</Text>
                <Text style={StockStyle.details_text_output}>{item.stock}</Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Location</Text>
                <Text style={StockStyle.details_text_output}>{item.location}</Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Price</Text>
                <Text style={StockStyle.details_text_output}>${item.price}</Text>
            </View>
            <View>
                <Pressable style={StockStyle.details_button_edit}>
                    <Text style={StockStyle.details_button_text}>EDIT</Text>
                </Pressable>
                <Pressable style={StockStyle.details_button_remove}>
                    <Text style={StockStyle.details_button_text}>Remove Item</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
    
}
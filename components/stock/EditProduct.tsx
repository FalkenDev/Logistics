import { View, Text, Pressable, Image, ScrollView, TextInput } from "react-native";
import { useState, useEffect } from 'react';
import { Base, Typography,DashboardStyle, StockStyle } from '../../styles/index.js';
import backgroundImage from "../../assets/androidback.png"; //Byt ut
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { header2 } from "../../styles/typography.js";
import Stock from "./Stock.js";
import Product from '../../interface/product';

export default function InfoList({ route, navigation, setProducts }) {
    console.log("Product Info");
    const { item } = route.params;
    const [product, setProduct] = useState<Partial<Product>>({});

    return (
        <ScrollView>
            <View style={StockStyle.details_header}>
                <FontAwesome5 style={DashboardStyle.logo} name="box" size={60} color="white" />
            </View>
            <View>
                <Text style={StockStyle.details_text_title}>Name</Text>
                <TextInput
                    style={StockStyle.details_text_output}
                    placeholder = {item.name}
                    value = {item.name}
                />
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>ID</Text>
                <Text style={StockStyle.details_text_output}><Text style={StockStyle.details_text_id}>#{item.id}</Text></Text>
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Article number</Text>
                <TextInput
                    style={StockStyle.details_text_output}
                    placeholder = "{item.article_number}"
                    value = "{item.article_number}"
                />
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Description</Text>
                <TextInput
                    style={StockStyle.details_text_output}
                    placeholder = {item.description ?? "None"}
                    value = {item.description ?? "None"}
                />
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Specifiers</Text>
                <TextInput
                    style={StockStyle.details_text_output}
                    placeholder = {item.specifiers ?? "None"}
                    value = {item.specifiers ?? "None"}
                />
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Stock</Text>
                <TextInput
                    style={StockStyle.details_text_output}
                    placeholder = "{item.stock}"
                    value = "{item.stock}"
                    keyboardType="numeric"
                />
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Location</Text>
                <TextInput
                    style={StockStyle.details_text_output}
                    placeholder = {item.location}
                    value = {item.location}
                />
                <View style={StockStyle.details_line}></View>

                <Text style={StockStyle.details_text_title}>Price</Text>
                <TextInput
                    style={StockStyle.details_text_output}
                    placeholder = "$"{...item.price}
                    value = {item.price}
                    keyboardType="numeric"
                />
            </View>
            <View>
                <Pressable style={StockStyle.details_button_edit}>
                    <Text style={StockStyle.details_button_text}>Save Edit</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
    
}
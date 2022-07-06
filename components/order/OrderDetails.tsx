import { View, Text, Pressable, Image } from "react-native";
import { useState, useEffect } from 'react';
import { Base, Typography,DashboardStyle } from '../../styles/index.js';
import backgroundImage from "../../assets/androidback.png"; //Byt ut

export default function InfoList({ route, navigation, setProducts }) {
    console.log("Product Info");
    const { item } = route.params;

    return (
        <View>
            <View>
                <Image source={backgroundImage} style={DashboardStyle.imageDisplay}></Image>
            </View>
            <View>
                <Text style={Typography.details_text}>{item.id}</Text>
                <Text style={Typography.details_text}>{item.article_number}</Text>
                <Text style={Typography.details_text}>{item.name}</Text>
                <Text style={Typography.details_text}>{item.description ?? "None"}</Text>
                <Text style={Typography.details_text}>{item.specifiersc ?? "None"}</Text>
                <Text style={Typography.details_text}>{item.stock}</Text>
                <Text style={Typography.details_text}>{item.location}</Text>
                <Text style={Typography.details_text}>{item.price}</Text>
            </View>
            <View>
                <Pressable><Text>Edit</Text></Pressable>
                <Pressable><Text>Remove</Text></Pressable>
            </View>
        </View>
    )
    
}
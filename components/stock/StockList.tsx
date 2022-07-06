import { useCallback, useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, Button, StyleSheet, Pressable, View } from "react-native";
import { Typography, Base, StockStyle, DashboardStyle } from '../../styles/index.js';
import productModel from "../../models/product";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import SearchBar from "react-native-dynamic-search-bar";
import { DataTable } from 'react-native-paper';

export default function StockList({ route, navigation, products, setProducts }) {
    console.log("------| Loading StockList from Stock |------")
    let productLength = products.length;
    const [searchProducts, setSearchProducts] = useState([]);

    useEffect(() => {
        (async () => {
            setProducts(await productModel.getProducts());
            setSearchProducts(products);
        })();
    }, []);

    let listOfSearchProducts;

    async function searchFunction(name: string) {
        console.log(name);
        if(name === "") {
            setSearchProducts(products);
        } else {
            setSearchProducts( await productModel.getSearchProduct(name))
        }
    }

    return (
        <ScrollView style={{backgroundColor: "white"}}>
            <SearchBar style={{marginTop: 20, borderBottomColor: "grey", borderBottomWidth: 1}}
                placeholder="Search here"
                onPress={() => setSearchProducts(products)}
                onChangeText={(text) => searchFunction(text)}
                onClearPress={() => setSearchProducts(products)}
            />
            <View style={{marginLeft: "auto", marginRight: "auto"}}>
                <View style={StockStyle.container}>
                    <View style={StockStyle.stockContainerLogo}>
                        <View style={StockStyle.circle}><FontAwesome5 style={DashboardStyle.logo} name="box" size={28} color="white" /></View>
                    </View>
                    <View style={StockStyle.stockContainerText}>
                        <Text style={StockStyle.textNumber}>{productLength}</Text>
                        {productLength === 1
                        ?<Text style={StockStyle.textInfo}>Item in Stock</Text>
                        :<Text style={StockStyle.textInfo}>Items in Stock</Text>
                        }
                    </View>
                </View>
            </View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{flex: 1.3}}>#</DataTable.Title>
                    <DataTable.Title style={{flex: 1.3}}>ArticleNr</DataTable.Title>
                    <DataTable.Title style={{flex: 1.8}}>Name</DataTable.Title>
                    <DataTable.Title style={{flex: 1}}>Stock</DataTable.Title>
                    <DataTable.Title style={{flex: 0.4}}></DataTable.Title>
                </DataTable.Header>
            </DataTable>
            { listOfSearchProducts = searchProducts
            .map((item, index) => {
                return (
                    <Pressable key={index} onPress={() => { navigation.navigate('Details', {item: item}); }}>
                        <DataTable.Row style={{height: 90}}>
                            <DataTable.Cell style={{flex: 1.4}}><View style={StockStyle.rectangle}><FontAwesome5 style={DashboardStyle.logo} name="box" size={30} color="white" /></View></DataTable.Cell>
                            <DataTable.Cell style={{flex: 1.3}}>{item.article_number}</DataTable.Cell>
                            <DataTable.Cell style={{flex: 1.8}}>{item.name}</DataTable.Cell>
                            <DataTable.Cell style={{flex: 1}}>{item.stock}</DataTable.Cell>
                            <DataTable.Cell style={{flex: 0.4}}><MaterialIcons name="arrow-forward-ios" size={14} color="black" /></DataTable.Cell>
                        </DataTable.Row>
                    </Pressable>
                )
            })
            }
        </ScrollView>
    );
}


import { useCallback, useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, Button, StyleSheet, Pressable, View } from "react-native";
import { Typography, Base } from '../../styles/index.js';
import productModel from "../../models/product";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import SearchBar from "react-native-dynamic-search-bar";

export default function StockList({ route, navigation, products, setProducts }) {
    console.log("------| Loading StockList from Stock |------")
    const [searchProducts, setSearchProducts] = useState([]);

    useEffect(() => {
        (async () => {
            setProducts(await productModel.getProducts());
        })();
    }, []);

    let listOfSearchProducts = products;

    async function searchFunction(name: string) {
        console.log(name);
        if(name === "") {
            setSearchProducts(products);
        } else {
            setSearchProducts( await productModel.getSearchProduct(name))
        }
    }

    return (
        <ScrollView>
            <SearchBar
                placeholder="Search here"
                onPress={() => setSearchProducts(products)}
                onChangeText={(text) => searchFunction(text)}
            />
            { listOfSearchProducts = searchProducts
            .map((item, index) => {
                return (
                <Pressable onPress={() => { navigation.navigate('Details', {item: item}); }}>
                    <View style={styles.container}>
                        <View style={styles.stockContainerLogo}>
                            <View style={styles.circle}><FontAwesome5 style={styles.logo} name="box" size={40} color="white" /></View>
                        </View>
                        <View style={styles.stockContainerText}>
                            <Text style={styles.textInfo}>{item.name}</Text>
                            <Text style={styles.textInfo}>{item.stock}</Text>
                        </View>
                        <View style={styles.stockContainerArrow}>
                            <AntDesign name="right" size={24} color="white" />
                        </View>
                    </View>
                </Pressable>
                )
            })
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        lineHeight: 20,
        backgroundColor: "#A8DADC",
        borderRadius: 20,
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
  
        elevation: 8,
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor: "#457B9D",
        marginLeft: "auto",
        marginRight: "auto",
    },
    logo: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "auto",
      marginBottom: "auto",
    },
    stockContainerLogo: {
      width: "30%"
    },
    stockContainerText: {
      width: "60%"
    },
    stockContainerArrow: {
        width: "10%"
    },
    textNumber: {
        fontSize: 34,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
    textInfo: {
      fontSize: 16,
      letterSpacing: 0.25,
      color: 'black',
    }
  });

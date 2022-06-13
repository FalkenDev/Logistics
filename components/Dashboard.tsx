import { StatusBar } from 'expo-status-bar';
import { Image, Text, ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, Typography } from '../styles/index.js';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function Home({ route, delivery, orders }) {

  const deliveryLength = delivery.length || 0;
  const ordersLength = orders.length || 0;

  let count = 0;

  orders
  .filter(order => order.status === "Skickad")
  .map((order, index) => {
      count = count + 1
  });

  return (
    <SafeAreaView style={Base.container}>
      <ScrollView style={Base.base}>
        <View></View>

        <View style={styles.container}>
          <View style={styles.dashContainerLogo}>
            <View style={styles.circle}><FontAwesome5 style={styles.logo} name="box" size={40} color="white" /></View>
          </View>
          <View style={styles.dashContainerText}>
            <Text style={styles.textNumber}>{ordersLength}</Text>
            <Text style={styles.textInfo}>Orders in progress</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.dashContainerLogo}>
            <View style={styles.circle}><MaterialCommunityIcons style={styles.logo} name="truck-delivery" size={48} color="white" /></View>
          </View>
          <View style={styles.dashContainerText}>
            <Text style={styles.textNumber}>{count}</Text>
            <Text style={styles.textInfo}>Deliverys in Progress</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.dashContainerLogo}>
            <View style={styles.circle}><MaterialIcons style={styles.logo} name="add-circle" size={54} color="white" /></View>
          </View>
          <View style={styles.dashContainerText}>
            <Text style={styles.textNumber}>{deliveryLength}</Text>
            <Text style={styles.textInfo}>Submissions</Text>
          </View>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
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
  dashContainerLogo: {
    width: "30%"
  },
  dashContainerText: {
    width: "70%"
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
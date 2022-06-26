import { StatusBar } from 'expo-status-bar';
import { Image, Text, ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, Typography, DashboardStyle } from '../styles/index.js';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import backgroundImage from "../assets/androidback.png";

export default function Home({ route, delivery, orders }) {

  const deliverysLength = delivery.length || 0;
  const ordersLength = orders.length || 0;
  const submissionsLength = 0;

  return (
    <SafeAreaView style={Base.container}>
      <ScrollView style={Base.base}>
        <View></View>
        <View style={DashboardStyle.imageContainer}>
          <Image source={backgroundImage} style={DashboardStyle.imageDisplay}></Image>
        </View>
        <View style={DashboardStyle.container}>
          <View style={DashboardStyle.dashContainerLogo}>
            <View style={DashboardStyle.circle}><FontAwesome5 style={DashboardStyle.logo} name="box" size={30} color="white" /></View>
          </View>
          <View style={DashboardStyle.dashContainerText}>
            <Text style={DashboardStyle.textNumber}>{ordersLength}</Text>
            {ordersLength === 1
              ?<Text style={DashboardStyle.textInfo}>Order in progress</Text>
              :<Text style={DashboardStyle.textInfo}>Orders in progress</Text>
            }
          </View>
        </View>

        <View style={DashboardStyle.container}>
          <View style={DashboardStyle.dashContainerLogo}>
            <View style={DashboardStyle.circle}><MaterialCommunityIcons style={DashboardStyle.logo} name="truck-delivery" size={38} color="white" /></View>
          </View>
          <View style={DashboardStyle.dashContainerText}>
            <Text style={DashboardStyle.textNumber}>{deliverysLength}</Text>
            {deliverysLength === 1
              ?<Text style={DashboardStyle.textInfo}>Delivery in Progress</Text>
              :<Text style={DashboardStyle.textInfo}>Deliverys in Progress</Text>
            }
          </View>
        </View>

        <View style={DashboardStyle.container}>
          <View style={DashboardStyle.dashContainerLogo}>
            <View style={DashboardStyle.circle}><MaterialIcons style={DashboardStyle.logo} name="add-circle" size={34} color="white" /></View>
          </View>
          <View style={DashboardStyle.dashContainerText}>
            <Text style={DashboardStyle.textNumber}>{submissionsLength}</Text>
            {submissionsLength === 1
              ?<Text style={DashboardStyle.textInfo}>Submission</Text>
              :<Text style={DashboardStyle.textInfo}>Submissions</Text>
            }
          </View>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
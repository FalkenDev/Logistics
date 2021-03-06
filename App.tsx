import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base } from './styles/index.js'; 
import { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';

import Stock from './components/stock/Stock';
import Dashboard from './components/Dashboard';
import Auth from "./components/auth/Auth";
import OrderView from "./components/order/Order";
import authModel from "./models/auth";

import Delivery from "./models/deliveries";
import Product from "./models/product";
import Orders from "./models/orders";


const Tab = createBottomTabNavigator();
const routeIcons = {
  "Dashboard": "home",
  "Stock": "box",
  "Pick": "plus-circle",
  "Submissions": "printer",
  "Invoices": "printer",
  "Login": "user",
  "Delivery": "map",
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoggedIn(await authModel.loggedIn());
      setProducts(await Product.getProducts());
      setOrders(await Orders.getOrders());
      setDelivery(await Delivery.getDeliveries());

    })();
  }, []);

  console.log(delivery);

  console.log("------| app.tsx |------");
  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = routeIcons[route.name] || "alert-circle";

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
          <Tab.Screen name="Dashboard">
            {() => <Dashboard orders={orders} delivery={delivery} />}
          </Tab.Screen>
          <Tab.Screen name="Stock">
            {() => <Stock products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Orders">
            {() => <OrderView orders={orders} setOrders={setOrders} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Delivery">
            {() => <Dashboard setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
          <Tab.Screen name="Submissons">
            {() => <Dashboard setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
          <Tab.Screen name="Invoices">
            {() => <Dashboard setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top"/>
    </SafeAreaView>
  );
}

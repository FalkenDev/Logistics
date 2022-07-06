import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './OrderList';
import OrderDetails from './OrderDetails';

const Stack = createNativeStackNavigator();

export default function Order(props) {
    return (
        <Stack.Navigator initialRouteName="Stock">
            <Stack.Screen name="List" options={{headerStyle: {backgroundColor: 'white'}, headerTintColor: 'black', headerTitleStyle: {fontWeight: 'bold'}}}>
                {(screenProps) => <OrderList {...screenProps}
                orders={props.orders} setOrders={props.setOrders}/>}
            </Stack.Screen>
            <Stack.Screen name="Details">
                {(screenProps) => <OrderDetails {...screenProps}
                setOrders={props.setOrders}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
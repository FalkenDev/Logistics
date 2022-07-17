import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './OrderList';
import OrderDetails from './OrderDetails';
import Pick from './Pick';

const Stack = createNativeStackNavigator();

export default function Order(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" options={{headerStyle: {backgroundColor: 'white'}, headerTintColor: 'black', headerTitleStyle: {fontWeight: 'bold'}}}>
                {(screenProps) => <OrderList {...screenProps}
                orders={props.orders} setOrders={props.setOrders}/>}
            </Stack.Screen>
            <Stack.Screen name="Details" options={{headerStyle: {backgroundColor: 'white'}, headerTintColor: 'black', headerTitleStyle: {fontWeight: 'bold'}}}>
                {(screenProps) => <OrderDetails {...screenProps}
                setOrders={props.setOrders}/>}
            </Stack.Screen>
            <Stack.Screen name="Pick" options={{headerStyle: {backgroundColor: 'white'}, headerTintColor: 'black', headerTitleStyle: {fontWeight: 'bold'}}}>
                {(screenProps) => <Pick {...screenProps}
                setProducts={props.setProducts}/>}
            </Stack.Screen>
            <Stack.Screen name="Cancel" options={{headerStyle: {backgroundColor: 'white'}, headerTintColor: 'black', headerTitleStyle: {fontWeight: 'bold'}}}>
                {(screenProps) => <OrderList {...screenProps}
                orders={props.orders} setOrders={props.setOrders}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
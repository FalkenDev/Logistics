import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StockList from './StockList';
import Product from './Product';

const Stack = createNativeStackNavigator();

export default function Stock(props) {
    return (
        <Stack.Navigator initialRouteName="Stock">
            <Stack.Screen name="Stock" options={{headerStyle: {backgroundColor: 'white'}, headerTintColor: 'black', headerTitleStyle: {fontWeight: 'bold'}}}>
                {(screenProps) => <StockList {...screenProps}
                products={props.products} setProducts={props.setProducts}/>}
            </Stack.Screen>
            <Stack.Screen name="Details" component={Product} options={{headerStyle: {backgroundColor: 'white'}, headerTintColor: 'black', headerTitleStyle: {fontWeight: 'bold'}}}/>
        </Stack.Navigator>
    );
}
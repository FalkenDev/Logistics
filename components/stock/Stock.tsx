import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StockList from './StockList';
import Product from './Product';
import Edit from './EditProduct';
import Add from './AddProduct';

const Stack = createNativeStackNavigator();

export default function Stock(props) {
    return (
        <Stack.Navigator initialRouteName="Stock">
            <Stack.Screen name="List" options={{headerStyle: {backgroundColor: 'white'}, headerTintColor: 'black', headerTitleStyle: {fontWeight: 'bold'}}}>
                {(screenProps) => <StockList {...screenProps}
                products={props.products} setProducts={props.setProducts}/>}
            </Stack.Screen>
            <Stack.Screen name="Details">
                {(screenProps) => <Product {...screenProps}
                setProducts={props.setProducts}/>}
            </Stack.Screen>
            <Stack.Screen name="Edit">
                {(screenProps) => <Edit {...screenProps}
                setProducts={props.setProducts}/>}
            </Stack.Screen>
            <Stack.Screen name="Add">
                {(screenProps) => <Add {...screenProps}
                setProducts={props.setProducts}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
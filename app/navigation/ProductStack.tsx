import { createNativeStackNavigator,NativeStackScreenProps } from "@react-navigation/native-stack"
import Products from "../screens/Products"


type ProductStackParamList = {
    Products: undefined,
    ProductDetails: { id: number }

}

const ProductsStack = createNativeStackNavigator<ProductStackParamList>()

export type ProductPageProps = NativeStackScreenProps<ProductStackParamList,'Products'>;
export type ProductDetailsPageProps =NativeStackScreenProps<ProductStackParamList,'ProductDetails'>;


const ProductsStackNav = () => (
    <ProductsStack.Navigator screenOptions={{
        headerStyle:{backgroundColor:"#1FE687" },
        headerTintColor:"#141414",
        headerTitleAlign:"center"
    }} >

        <ProductsStack.Screen name="Products" component={Products} options={{ headerTitle: 'Neon Shop' }}>
        

        </ProductsStack.Screen>

    </ProductsStack.Navigator>
)

export default ProductsStackNav;
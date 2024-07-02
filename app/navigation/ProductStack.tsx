import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import Products from "../screens/Products"
import ProductDetails from "../screens/ProductDetails"
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import useCartStore from "../state/cartStore"
import CartModal from "../screens/CartModal"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons';
import { useBottomSheetModal } from "@gorhom/bottom-sheet"



type ProductStackParamList = {
    Products: undefined;
    ProductDetails: { id: number };
    CartModal: undefined;
}

const ProductsStack = createNativeStackNavigator<ProductStackParamList>()

export type ProductPageProps = NativeStackScreenProps<ProductStackParamList, 'Products'>;
export type ProductDetailsPageProps = NativeStackScreenProps<ProductStackParamList, 'ProductDetails'>;
export type Stacknavigation = NavigationProp<ProductStackParamList>;

type ProductPageArgs = {
    onPress: () => void;
    visibility: boolean;
}

const ProductsStackNav = ({ onPress, visibility }: ProductPageArgs) => {


    return (
        <ProductsStack.Navigator screenOptions={{
            headerStyle: { backgroundColor: "#1FE687" },
            headerTintColor: "#141414",
            headerTitleAlign: "center",
            headerRight: () => <CartButton visibility={visibility} onPress={onPress} />
        }} >

            <ProductsStack.Screen name="Products" component={Products} options={{ headerTitle: ' Shop' }} />
            <ProductsStack.Screen name="ProductDetails" component={ProductDetails} options={{ headerTitle: 'Shop' }} />
            <ProductsStack.Screen
                name="CartModal"
                component={CartModal}
                options={{ headerShown: false, presentation: 'modal', animation: "slide_from_bottom", animationDuration: 100, }}
            />



        </ProductsStack.Navigator>
    )
}

const CartButton = ({ onPress, visibility }: ProductPageArgs) => {

    const navigation = useNavigation<Stacknavigation>()
    const [count, setCount] = useState(0)
    const { dismiss } = useBottomSheetModal()

    const { products } = useCartStore((state) => ({
        products: state.products
    }));

    useEffect(() => {
        const count = products.reduce((prev, products) => prev + products.quantity, 0)
        setCount(count)

    }, [products])

    return (

        <TouchableOpacity onPress={() => visibility? dismiss():  onPress()}>
            <View style={styles.countContainer}>
                <Text >{count}</Text>
            </View>
            <Ionicons name="cart" size={28} />
        </TouchableOpacity >

    )

}



const styles = StyleSheet.create({
    countContainer: {
        // padding:5,
        borderRadius: 10,
        backgroundColor: '#ffff',
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -5,
        right: -10,
        zIndex: 10,
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },

})








export default ProductsStackNav;
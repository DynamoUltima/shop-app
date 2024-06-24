import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import Products from "../screens/Products"
import ProductDetails from "../screens/ProductDetails"
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import useCartStore from "../state/cartStore"
import CartModal from "../screens/CartModal"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"


type ProductStackParamList = {
    Products: undefined;
    ProductDetails: { id: number };
    CartModal: undefined;
}

const ProductsStack = createNativeStackNavigator<ProductStackParamList>()

export type ProductPageProps = NativeStackScreenProps<ProductStackParamList, 'Products'>;
export type ProductDetailsPageProps = NativeStackScreenProps<ProductStackParamList, 'ProductDetails'>;
export type Stacknavigation = NavigationProp<ProductStackParamList>;



const ProductsStackNav = () => {


    return (
        <ProductsStack.Navigator screenOptions={{
            headerStyle: { backgroundColor: "#1FE687" },
            headerTintColor: "#141414",
            headerTitleAlign: "center",
            headerRight: () => <CartButton />
        }} >

            <ProductsStack.Screen name="Products" component={Products} options={{ headerTitle: 'Neon Shop' }} />
            <ProductsStack.Screen name="ProductDetails" component={ProductDetails} options={{ headerTitle: 'Neon Shop' }} />
            <ProductsStack.Screen
                name="CartModal"
                component={CartModal}
                options={{ headerShown: false, presentation: 'modal', animation: "slide_from_bottom", animationDuration: 100, }}
            />



        </ProductsStack.Navigator>
    )
}

const CartButton = () => {

    const navigation = useNavigation<Stacknavigation>()
    const [count, setCount] = useState(0)

    const { products } = useCartStore((state) => ({
        products: state.products
    }));

    useEffect(() => {
        const count = products.reduce((prev, products) => prev + products.quantity, 0)
        setCount(count)

    }, [products])

    return (
        <TouchableOpacity onPress={() => navigation.navigate('CartModal')}>
            <View style={styles.countContainer}>
                <Text >{count}</Text>
            </View>
            <Ionicons name="cart" size={28} />
        </TouchableOpacity >
    )

}

// export  const CustomModal =({handleSheetChanges}:any)=>{
//     const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//     const snapPoints = useMemo(() => ['25%', '50%'], []);

//     return (
//         <GestureHandlerRootView style={{ flex: 1 }}>



//             <BottomSheetModalProvider>
//                 <View style={styles.container}>
//                     {/* <Button
//                         onPress={handlePresentModalPress}
//                         title="Present Modal"
//                         color="black"
//                     /> */}
//                     <BottomSheetModal
//                         ref={bottomSheetModalRef}
//                         index={0}
//                         snapPoints={snapPoints}
//                         onChange={handleSheetChanges}
//                     >
//                         <BottomSheetView style={styles.contentContainer}>
//                             <Text>Awesome 🎉</Text>
//                         </BottomSheetView>
//                     </BottomSheetModal>
//                 </View >
//             </BottomSheetModalProvider >



//          </GestureHandlerRootView>
//     )
// }

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
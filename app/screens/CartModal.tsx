import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import useCartStore from "../state/cartStore";
import { useState } from "react";

const CartModal = () => {

    const { products, addProducts, clearCart, reduceProducts, total } = useCartStore((state) => ({
        products: state.products,
        addProducts: state.addProducts,
        reduceProducts: state.reduceProducts,
        clearCart: state.clearCart,
        total: state.total
    }));
   

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardTitle}>
                <Text style={styles.titleText} >
                    Cart Modal
                </Text>
            </View>
            <FlatList
            // style={{backgroundColor:'lightgreen',}}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.image} source={{ uri: item.product_image }} />
                        <View style={styles.listContent} >
                            <Text style={styles.title}>{item.product_name}</Text>
                            <Text >Price {item.product_price}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => reduceProducts(item)} >
                                <Ionicons name="remove" size={24} />
                            </TouchableOpacity>
                            <Text style={styles.buttonText}>{item.quantity}</Text>
                            <TouchableOpacity style={styles.button} >
                                <Ionicons name="add" size={24} onPress={() => addProducts(item)} />
                            </TouchableOpacity>

                        </View>
                    </View>

                )} />

            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>



        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'flex-start',
        backgroundColor:'white'
    },
    cardTitle: {
        alignItems: 'center',
        padding: 10
    },
    titleText: {
        fontWeight: 'bold',
        color: '#1FE687',
        fontSize: 24
    },
    listItem: {
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        marginBottom:10,
        alignItems:'center',
        
    },
    image: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    listContent: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        // fontSize: 18
    },
    subTitle: {

    },
    buttonText: {

        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: '#1FE687',
        padding: 10
    },

    button: {
        alignItems: 'center',
        padding: 5

    },
    buttonContainer: {
        // flex: 1,
        flexDirection: 'row',
        // paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    total: {
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
        padding: 10,
       
        

    }

})

export default CartModal;
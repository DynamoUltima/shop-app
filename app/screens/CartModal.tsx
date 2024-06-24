import { Button, FlatList, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import useCartStore from "../state/cartStore";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Stacknavigation } from "../navigation/ProductStack";
import { Order, createOrder } from "../api/api";

const CartModal = () => {

    const [submitting, setsubmitting] = useState(false);
    const navigation = useNavigation<Stacknavigation>();
    const [email, setEmail] = useState('testdynamo@gmail.com');
    const [order, setOrder] = useState<Order | null>(null)

    const { products, addProducts, clearCart, reduceProducts, total } = useCartStore((state) => ({
        products: state.products,
        addProducts: state.addProducts,
        reduceProducts: state.reduceProducts,
        clearCart: state.clearCart,
        total: state.total
    }));

    const onSubmitOrder = async () => {
        setsubmitting(true)
        Keyboard.dismiss

        try {
            const response = await createOrder({
                customer_email: email, products: products.map((p) => ({
                    product_id: p.id,
                    quantity: p.quantity
                }),),
            });
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            setOrder(response)

            clearCart()

        } finally {
            setsubmitting(false)
        }

    }


    return (
        <View style={styles.container}>
            {order && (
                <View style={{ marginTop: '50%', padding: 20, backgroundColor: '#000', borderRadius: 8, marginBottom: 20, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 26 }}>Order submitted!</Text>
                    <Text style={{ color: '#fff', fontSize: 16, margin: 20 }}>Order ID: {order.id}</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: '#1FE687', padding: 10, borderRadius: 8 }}>
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>Continue Shopping</Text>
                    </TouchableOpacity>
                </View>
            )}
            {!order && (<SafeAreaView style={styles.container}>
                <View style={styles.cardTitle}>
                    <Text style={styles.titleText} >
                        Cart Modal
                    </Text>
                </View>
                {products.length === 0 && <Text style={{ textAlign: 'center' }}>Your cart is empty</Text>}
                <FlatList
                    //style={{backgroundColor:'lightgreen',}}
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

                {products.length !== 0 && <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>}
                {products.length !== 0 && <TextInput style={styles.emailInput} placeholder="Enter your email" onChangeText={setEmail} />}
                {products.length !== 0 &&  <TouchableOpacity style={[styles.submitButton, email === '' ? styles.inactive : null]} onPress={onSubmitOrder} disabled={email === '' || submitting}>
                    <Text style={styles.submitText}>{submitting ? 'create Order' : 'Submit Order'}</Text>
                </TouchableOpacity>}

                {/* <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                <TextInput style={styles.emailInput} placeholder="Enter your email" onChangeText={setEmail} />
                <TouchableOpacity style={[styles.submitButton, email === '' ? styles.inactive : null]} onPress={onSubmitOrder} disabled={email === '' || submitting}>
                    <Text style={styles.submitText}>{submitting ? 'create Order' : 'Submit Order'}</Text>
                </TouchableOpacity> */}



            </SafeAreaView>)}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'flex-start',
        backgroundColor: 'white'
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
        marginBottom: 10,
        alignItems: 'center',

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
        marginHorizontal: 10,
        marginBottom: 10,

    },
    emailInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10
    },
    submitButton: {
        backgroundColor: 'black',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 5

    },
    submitText: {
        color: '#1FE687',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 5
    },
    inactive: {
        opacity: 0.5,
    },


})

export default CartModal;
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProductDetailsPageProps } from "../navigation/ProductStack";
import { Product, fetchProductDetails } from "../api/api";
import useCartStore, { CartState } from "../state/cartStore";
import { Ionicons } from '@expo/vector-icons';


const ProductDetails = ({ route }: ProductDetailsPageProps) => {
    const [product, setProducts] = useState<Product | null>(null);
    const [count, setCount] = useState(0)

    const { id } = route.params;

    const { products, addProducts, reduceProducts } = useCartStore((state) => ({
        products: state.products,
        addProducts: state.addProducts,
        reduceProducts: state.reduceProducts
    }))

    //update quantity when ver we add a product
    // we aree going to listen to changes the products array 
    // when product is added or subtrated add  update quantity accordingly
    //quantity is updated by setting count : filtering by id  then  displaying quantty of that product


    useEffect(() => {
        updateProductQuantity()
        console.log('quantity updated')
    }, [products])



    useEffect(() => {
        const loadData = async () => {
            const data = await fetchProductDetails(id);
            setProducts(data)
        }
        loadData();
    }, [])


    const updateProductQuantity = () => {

        const results = products.filter((p) => p.id === id);

        if (results.length > 0) {
            setCount(results[0].quantity);
        } else {
            setCount(0)
        }

    }
    return (
        <>
            {products ? (<View style={styles.container}>
                <Image style={styles.productImage} source={{ uri: product?.product_image }} />
                <Text style={styles.productName}>
                    {product?.product_name}
                </Text>
                <Text style={styles.productDescription}>
                    {product?.product_description}
                </Text>
                <Text style={styles.productCategory}>
                    {product?.product_category}
                </Text>
                {/* <Text style={styles.productDescription}>
                {product?.product_stock}
            </Text> */}
                <Text style={styles.productPrice}>
                    Price : {product?.product_price}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => reduceProducts(product!)} >
                        <Ionicons name="remove" size={24} color={'#1FE687'} />
                    </TouchableOpacity>
                    <Text style={styles.buttonText}>{count}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => addProducts(product!)} >
                        <Ionicons name="add" size={24} color={'#1FE687'} />
                    </TouchableOpacity>

                </View>


            </View>) :
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>}

        </>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

        gap: 10
    },
    productImage: {
        height: 300,
        resizeMode: 'cover',


    },
    productName: {
        fontWeight: 'bold',
        fontSize: 22,
        paddingHorizontal: 10
    },
    productDescription: {
        paddingHorizontal: 10

    },
    productPrice: {
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 22,
    },
    productCategory: {
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    buttonContainer: {
        // flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 22
    },

    button: {
        borderColor: '#1FE687',
        borderWidth: 2,
        alignItems: 'center',
        borderRadius: 5,
        flex: 1,
        padding: 10

    }



})

export default ProductDetails;
import { useEffect, useState } from "react";
import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Product, fetchProducts } from "../api/api";
import { ProductPageProps } from "../navigation/ProductStack";
import { SafeAreaView } from "react-native-safe-area-context";


const Products = ({ navigation }: ProductPageProps) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        const load = async () => {
            const data = await fetchProducts();
            setProducts(data)
        }
        load()

    }, [])

    const renderProductItem:ListRenderItem<Product> = ({ item }: { item: Product }) => (
        <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('ProductDetails', { id: item.id })} >
            <Image style={styles.productImage} source={{uri: item.product_image}} />

            <Text style={styles.productName}>{item.product_name}</Text>
            <Text>{item.product_price}</Text>
        </TouchableOpacity>

    )

    return (
        <SafeAreaView  style={styles.container}>
            <FlatList data={products} renderItem={renderProductItem} keyExtractor={(item)=>item.id.toString()} numColumns={2}></FlatList>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f2f2f2'
    },
    productName:{
        fontWeight:'bold',
        fontSize:14,
        marginTop:8
    },
    productPrice:{},
    productImage:{
        width:100,
        height:100,
        
    },
    productItem:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#ffff',
        margin:5,
        padding:10
    }

})
export default Products;
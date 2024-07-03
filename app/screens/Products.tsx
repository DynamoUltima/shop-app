import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ListRenderItem, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true); // Start the refreshing indicator
        
        const newData = await fetchProducts(); 
        setProducts(newData);
        setRefreshing(false); // Stop the refreshing indicator
    };

    const renderProductItem: ListRenderItem<Product> = ({ item }: { item: Product }) => (
        <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('ProductDetails', { id: item.id })} >
            <Image style={styles.productImage} source={{ uri: item.product_image }} />

            <Text style={styles.productName}>{item.product_name}</Text>
            <Text>{item.product_price}</Text>
        </TouchableOpacity>

    )

    return (
        <View style={styles.container}>

            {products.length !==0 ? (<FlatList data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                } />) :
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 8
    },
    productPrice: {},
    productImage: {
        width: 100,
        height: 100,

    },
    productItem: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffff',
        margin: 5,
        padding: 10
    },
    loading: {
        flex: 1,
        justifyContent: 'center'
    },

})
export default Products;
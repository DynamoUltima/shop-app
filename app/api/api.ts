const API_URL = process.env.EXPO_PUBLIC_API_URL

export interface Product {
    id: number;
    product_name: string;
    product_category: string;
    product_description: string;
    product_price: number;
    product_stock: number;
    product_image: string;
}

interface CreateOrder {
    email: string;
    products: Array<{ product_id: number; quantity: number }>;
}

export interface Order {
    id: number;
    order_date: Date;
    customer_email: string;
    total: number;
}


export const fetchProducts = async () => {

    try {
        const response = await fetch(`http://192.168.80.82:3000/products`);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        console.log(response)
        return await response.json()
        
    } catch (error) {
        console.log(error)
        return []
    }

}

export async function fetchProductDetails(productId: number): Promise<Product | null> {

    try {
        const response = await fetch(`http://192.168.80.82:3000/products/${productId}`)

        if (!response.ok) {
            throw new Error("Failed to fetch Product");
        }

        return await response.json()

    } catch (error) {
        console.log(error);
        return null;

    }

}


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
    customer_email: string;
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
        const response = await fetch(`${API_URL}/products`);

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
        const response = await fetch(`${API_URL}/products/${productId}`)

        if (!response.ok) {
            throw new Error("Failed to fetch Product");
        }

        return await response.json()

    } catch (error) {
        console.log(error);
        return null;

    }

}


export async function createOrder(orderData: CreateOrder): Promise<Order | null> {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch order details.');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching order details:', error);
      return null;
    }
  }


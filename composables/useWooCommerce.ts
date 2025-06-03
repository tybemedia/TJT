import type { WooProduct, WooCart } from '~/types/woocommerce'

export const useWooCommerce = () => {
  const config = useRuntimeConfig()
  const API_URL = 'https://thejoshuatea.de/wp-json'
  const CONSUMER_KEY = config.public.woocommerceConsumerKey as string
  const CONSUMER_SECRET = config.public.woocommerceConsumerSecret as string

  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error('WooCommerce API configuration is missing.')
  }

  const handleApiError = (error: any, operation: string): never => {
    console.error(`Error during ${operation}:`, error)
    throw new Error(`Failed to ${operation}: ${error.message || 'Unknown error'}`)
  }

  const testConnection = async (): Promise<boolean> => {
    try {
      const queryParams = new URLSearchParams({
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET
      })
      const response = await fetch(`${API_URL}/wc/v3/products?${queryParams}`)
      if (!response.ok) throw response
      const data = await response.json()
      console.log('API test successful, received', data.length, 'products')
      return true
    } catch (error) {
      return handleApiError(error, 'test connection')
    }
  }

  const getProducts = async (params?: Record<string, any>): Promise<WooProduct[]> => {
    try {
      const queryParams = new URLSearchParams({
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
        ...params
      })
      const response = await fetch(`${API_URL}/wc/v3/products?${queryParams}`)
      if (!response.ok) throw response
      return await response.json()
    } catch (error) {
      return handleApiError(error, 'product fetch')
    }
  }

  const getProduct = async (id: number): Promise<WooProduct> => {
    try {
      const queryParams = new URLSearchParams({
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET
      })
      const response = await fetch(`${API_URL}/wc/v3/products/${id}?${queryParams}`)
      if (!response.ok) throw response
      return await response.json()
    } catch (error) {
      return handleApiError(error, 'single product fetch')
    }
  }

  const getCart = async (): Promise<WooCart> => {
    try {
      const response = await fetch(`${API_URL}/wc/store/cart`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      })
      const data = await response.json()

      if (!response.ok) {
        console.error('Cart API Error:', data)
        throw new Error(data.message || 'Failed to fetch cart')
      }

      console.log('Cart Response:', data)

      return {
        cart_key: data.cart_key || '',
        items: data.items?.map((item: any) => ({
          key: item.key,
          id: item.id,
          quantity: item.quantity,
          name: item.name,
          price: item.prices?.price,
          total: item.prices?.total,
          image: item.images?.[0]?.src || ''
        })) || [],
        total: data.totals?.total_price || 0,
        subtotal: data.totals?.total_items || 0,
        shipping: data.totals?.total_shipping || 0,
        tax: data.totals?.total_tax || 0
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
      return {
        cart_key: '',
        items: [],
        total: 0,
        subtotal: 0,
        shipping: 0,
        tax: 0
      }
    }
  }

  const addToCart = async (productId: number, quantity: number = 1): Promise<WooCart> => {
    try {
      console.log('Adding to cart:', { productId, quantity })
      const response = await fetch(`${API_URL}/wc/store/cart/add-item`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: productId,
          quantity
        })
      })

      const data = await response.json()
      console.log('Add to cart response:', data)

      if (!response.ok) {
        console.error('Add to Cart API Error:', data)
        throw new Error(data.message || 'Failed to add item to cart')
      }

      return {
        cart_key: data.cart_key || '',
        items: data.items?.map((item: any) => ({
          key: item.key,
          id: item.id,
          quantity: item.quantity,
          name: item.name,
          price: item.prices?.price,
          total: item.prices?.total,
          image: item.images?.[0]?.src || ''
        })) || [],
        total: data.totals?.total_price || 0,
        subtotal: data.totals?.total_items || 0,
        shipping: data.totals?.total_shipping || 0,
        tax: data.totals?.total_tax || 0
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw error
    }
  }

  const updateCartItem = async (itemKey: string, quantity: number): Promise<WooCart> => {
    try {
      const response = await fetch(`${API_URL}/wc/store/cart/update-item`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          key: itemKey,
          quantity
        })
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Update Cart API Error:', data)
        throw new Error(data.message || 'Failed to update cart item')
      }

      return {
        cart_key: data.cart_key || '',
        items: data.items?.map((item: any) => ({
          key: item.key,
          id: item.id,
          quantity: item.quantity,
          name: item.name,
          price: item.prices?.price,
          total: item.prices?.total,
          image: item.images?.[0]?.src || ''
        })) || [],
        total: data.totals?.total_price || 0,
        subtotal: data.totals?.total_items || 0,
        shipping: data.totals?.total_shipping || 0,
        tax: data.totals?.total_tax || 0
      }
    } catch (error) {
      console.error('Error updating cart item:', error)
      throw error
    }
  }

  const removeCartItem = async (itemKey: string): Promise<WooCart> => {
    try {
      const response = await fetch(`${API_URL}/wc/store/cart/remove-item`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          key: itemKey
        })
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Remove Cart Item API Error:', data)
        throw new Error(data.message || 'Failed to remove cart item')
      }

      return {
        cart_key: data.cart_key || '',
        items: data.items?.map((item: any) => ({
          key: item.key,
          id: item.id,
          quantity: item.quantity,
          name: item.name,
          price: item.prices?.price,
          total: item.prices?.total,
          image: item.images?.[0]?.src || ''
        })) || [],
        total: data.totals?.total_price || 0,
        subtotal: data.totals?.total_items || 0,
        shipping: data.totals?.total_shipping || 0,
        tax: data.totals?.total_tax || 0
      }
    } catch (error) {
      console.error('Error removing cart item:', error)
      throw error
    }
  }

  const clearCart = async (): Promise<WooCart> => {
    try {
      const response = await fetch(`${API_URL}/wc/store/cart/clear`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Clear Cart API Error:', data)
        throw new Error(data.message || 'Failed to clear cart')
      }

      return {
        cart_key: data.cart_key || '',
        items: [],
        total: 0,
        subtotal: 0,
        shipping: 0,
        tax: 0
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
      throw error
    }
  }

  return {
    testConnection,
    getProducts,
    getProduct,
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
  }
}
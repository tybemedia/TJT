import type { WooProduct, WooCategory } from '~/types/woocommerce'

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
      const response = await fetch(`${API_URL}/wc/v3/products?per_page=1`, {
        headers: {
          'Authorization': `Basic ${btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)}`
        }
      })
      return response.ok
    } catch (error) {
      console.error('Error testing WooCommerce connection:', error)
      return false
    }
  }

  const getProducts = async (params: Record<string, any> = {}): Promise<WooProduct[]> => {
    const queryParams = new URLSearchParams({
      per_page: '100',
      ...params
    })

    const response = await fetch(`${API_URL}/wc/v3/products?${queryParams}`, {
      headers: {
        'Authorization': `Basic ${btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    return response.json()
  }

  const getProduct = async (id: number): Promise<WooProduct> => {
    const response = await fetch(`${API_URL}/wc/v3/products/${id}`, {
      headers: {
        'Authorization': `Basic ${btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch product')
    }

    return response.json()
  }

  const getCategories = async (): Promise<WooCategory[]> => {
    const response = await fetch(`${API_URL}/wc/v3/products/categories?per_page=100`, {
      headers: {
        'Authorization': `Basic ${btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }

    return response.json()
  }

  return {
    testConnection,
    getProducts,
    getProduct,
    getCategories
  }
}
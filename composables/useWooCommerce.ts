import type { WooProduct } from '~/types/woocommerce'

export const useWooCommerce = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.woocommerceApiUrl as string
  const CONSUMER_KEY = config.public.woocommerceConsumerKey as string
  const CONSUMER_SECRET = config.public.woocommerceConsumerSecret as string

  if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error('WooCommerce API configuration is missing.')
  }

  const handleApiError = (error: unknown, context: string): never => {
    if (error instanceof Response) {
      throw new Error(`WooCommerce API ${context} failed: ${error.status} ${error.statusText}`)
    }
    if (error instanceof Error) {
      throw new Error(`WooCommerce API ${context} failed: ${error.message}`)
    }
    throw new Error(`WooCommerce API ${context} failed: Unknown error`)
  }

  const testConnection = async (): Promise<boolean> => {
    try {
      const queryParams = new URLSearchParams({
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET
      })
      const response = await fetch(`${API_URL}/products?${queryParams}`)
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
      const response = await fetch(`${API_URL}/products?${queryParams}`)
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
      const response = await fetch(`${API_URL}/products/${id}?${queryParams}`)
      if (!response.ok) throw response
      return await response.json()
    } catch (error) {
      return handleApiError(error, 'single product fetch')
    }
  }

  return {
    testConnection,
    getProducts,
    getProduct
  }
}
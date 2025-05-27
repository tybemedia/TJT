import { defineStore } from 'pinia'
import type { WooCart, WooCartItem } from '~/types/woocommerce'

interface CartState {
  items: WooCartItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  loading: boolean
  error: string | null
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    total: 0,
    subtotal: 0,
    shipping: 0,
    tax: 0,
    loading: false,
    error: null
  }),

  getters: {
    itemCount: (state: CartState) => state.items.length,
    isEmpty: (state: CartState) => state.items.length === 0
  },

  actions: {
    async fetchCart() {
      this.loading = true
      this.error = null
      try {
        const { getCart } = useWooCommerce()
        const cart = await getCart()
        this.items = cart.items
        this.total = cart.total
        this.subtotal = cart.subtotal
        this.shipping = cart.shipping
        this.tax = cart.tax
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch cart'
      } finally {
        this.loading = false
      }
    },

    async addItem(productId: number, quantity: number = 1) {
      this.loading = true
      this.error = null
      try {
        const { addToCart } = useWooCommerce()
        const cart = await addToCart(productId, quantity)
        this.items = cart.items
        this.total = cart.total
        this.subtotal = cart.subtotal
        this.shipping = cart.shipping
        this.tax = cart.tax
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to add item to cart'
      } finally {
        this.loading = false
      }
    },

    async updateItem(itemKey: string, quantity: number) {
      this.loading = true
      this.error = null
      try {
        const { updateCartItem } = useWooCommerce()
        const cart = await updateCartItem(itemKey, quantity)
        this.items = cart.items
        this.total = cart.total
        this.subtotal = cart.subtotal
        this.shipping = cart.shipping
        this.tax = cart.tax
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to update cart item'
      } finally {
        this.loading = false
      }
    },

    async removeItem(itemKey: string) {
      this.loading = true
      this.error = null
      try {
        const { removeCartItem } = useWooCommerce()
        const cart = await removeCartItem(itemKey)
        this.items = cart.items
        this.total = cart.total
        this.subtotal = cart.subtotal
        this.shipping = cart.shipping
        this.tax = cart.tax
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to remove cart item'
      } finally {
        this.loading = false
      }
    },

    async clearCart() {
      this.loading = true
      this.error = null
      try {
        const { clearCart } = useWooCommerce()
        const cart = await clearCart()
        this.items = cart.items
        this.total = cart.total
        this.subtotal = cart.subtotal
        this.shipping = cart.shipping
        this.tax = cart.tax
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to clear cart'
      } finally {
        this.loading = false
      }
    }
  }
}) 
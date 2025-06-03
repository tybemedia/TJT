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
    isEmpty: (state: CartState) => state.items.length === 0,
    formattedTotal: (state: CartState) => {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
      }).format(state.total)
    },
    formattedSubtotal: (state: CartState) => {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
      }).format(state.subtotal)
    },
    formattedShipping: (state: CartState) => {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
      }).format(state.shipping)
    },
    formattedTax: (state: CartState) => {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
      }).format(state.tax)
    }
  },

  actions: {
    async fetchCart() {
      this.loading = true
      this.error = null
      try {
        console.log('Fetching cart...')
        const { getCart } = useWooCommerce()
        const cart = await getCart()
        console.log('Cart fetched:', cart)
        this.items = cart.items
        this.total = cart.total
        this.subtotal = cart.subtotal
        this.shipping = cart.shipping
        this.tax = cart.tax
      } catch (error) {
        console.error('Error fetching cart:', error)
        this.error = error instanceof Error ? error.message : 'Failed to fetch cart'
      } finally {
        this.loading = false
      }
    },

    async addItem(productId: number, quantity: number = 1) {
      this.loading = true
      this.error = null
      try {
        console.log('Adding item to cart:', { productId, quantity })
        const { addToCart } = useWooCommerce()
        const cart = await addToCart(productId, quantity)
        console.log('Cart after adding item:', cart)
        this.items = cart.items
        this.total = cart.total
        this.subtotal = cart.subtotal
        this.shipping = cart.shipping
        this.tax = cart.tax
      } catch (error) {
        console.error('Error adding item to cart:', error)
        this.error = error instanceof Error ? error.message : 'Failed to add item to cart'
      } finally {
        this.loading = false
      }
    },

    async updateItem(itemKey: string, quantity: number) {
      this.loading = true
      this.error = null
      try {
        console.log('Updating cart item:', { itemKey, quantity })
        const { updateCartItem } = useWooCommerce()
        const cart = await updateCartItem(itemKey, quantity)
        console.log('Cart after updating item:', cart)
        this.items = cart.items
        this.total = cart.total
        this.subtotal = cart.subtotal
        this.shipping = cart.shipping
        this.tax = cart.tax
      } catch (error) {
        console.error('Error updating cart item:', error)
        this.error = error instanceof Error ? error.message : 'Failed to update cart item'
      } finally {
        this.loading = false
      }
    },

    async removeItem(itemKey: string) {
      this.loading = true
      this.error = null
      try {
        console.log('Removing cart item:', { itemKey })
        const { removeCartItem } = useWooCommerce()
        const cart = await removeCartItem(itemKey)
        console.log('Cart after removing item:', cart)
        this.items = cart.items
        this.total = cart.total
        this.subtotal = cart.subtotal
        this.shipping = cart.shipping
        this.tax = cart.tax
      } catch (error) {
        console.error('Error removing cart item:', error)
        this.error = error instanceof Error ? error.message : 'Failed to remove cart item'
      } finally {
        this.loading = false
      }
    },

    async clearCart() {
      this.loading = true
      this.error = null
      try {
        console.log('Clearing cart...')
        const { clearCart } = useWooCommerce()
        const cart = await clearCart()
        console.log('Cart after clearing:', cart)
        this.items = cart.items
        this.total = cart.total
        this.subtotal = cart.subtotal
        this.shipping = cart.shipping
        this.tax = cart.tax
      } catch (error) {
        console.error('Error clearing cart:', error)
        this.error = error instanceof Error ? error.message : 'Failed to clear cart'
      } finally {
        this.loading = false
      }
    }
  }
}) 
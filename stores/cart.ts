import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  loading: boolean
  error: string | null
}

const STORAGE_KEY = 'cart'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })

  const formattedTotal = computed(() => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(totalPrice.value)
  })

  function loadFromStorage() {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY)
      if (storedCart) {
        const parsedItems = JSON.parse(storedCart)
        console.log('Loading cart from storage:', parsedItems)
        items.value = parsedItems
      }
    } catch (err) {
      console.error('Error loading cart from storage:', err)
      error.value = 'Failed to load cart from storage'
    }
  }

  function saveToStorage() {
    try {
      console.log('Saving cart to storage:', items.value)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
    } catch (err) {
      console.error('Error saving cart to storage:', err)
      error.value = 'Failed to save cart to storage'
    }
  }

  function addItem(product: { id: number; name: string; price: number; image: string }, quantity: number = 1) {
    console.log('Adding item to cart:', product, quantity)
    loading.value = true
    error.value = null
    try {
      const existingItem = items.value.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        items.value.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image
        })
      }

      saveToStorage()
      console.log('Cart after adding item:', items.value)
    } catch (err) {
      console.error('Error adding item to cart:', err)
      error.value = 'Failed to add item to cart'
    } finally {
      loading.value = false
    }
  }

  function updateItem(productId: number, quantity: number) {
    console.log('Updating item quantity:', productId, quantity)
    loading.value = true
    error.value = null
    try {
      const item = items.value.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          removeItem(productId)
        } else {
          item.quantity = quantity
          saveToStorage()
        }
      }
      console.log('Cart after updating item:', items.value)
    } catch (err) {
      console.error('Error updating cart item:', err)
      error.value = 'Failed to update cart item'
    } finally {
      loading.value = false
    }
  }

  function removeItem(productId: number) {
    console.log('Removing item:', productId)
    loading.value = true
    error.value = null
    try {
      items.value = items.value.filter(item => item.id !== productId)
      saveToStorage()
      console.log('Cart after removing item:', items.value)
    } catch (err) {
      console.error('Error removing item from cart:', err)
      error.value = 'Failed to remove item from cart'
    } finally {
      loading.value = false
    }
  }

  function clearCart() {
    console.log('Clearing cart')
    loading.value = true
    error.value = null
    try {
      items.value = []
      localStorage.removeItem(STORAGE_KEY)
      console.log('Cart cleared')
    } catch (err) {
      console.error('Error clearing cart:', err)
      error.value = 'Failed to clear cart'
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    error,
    totalItems,
    totalPrice,
    formattedTotal,
    loadFromStorage,
    saveToStorage,
    addItem,
    updateItem,
    removeItem,
    clearCart
  }
}) 
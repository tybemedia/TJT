import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isOpen = ref(false)

  // Load cart from localStorage on initialization
  const loadFromStorage = () => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      items.value = JSON.parse(storedCart)
    }
  }

  // Save cart to localStorage whenever it changes
  const saveToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  // Add item to cart
  const addItem = (item: CartItem) => {
    const existingItem = items.value.find(i => i.id === item.id)
    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      items.value.push(item)
    }
    saveToStorage()
    isOpen.value = true // Automatically open cart when item is added
  }

  // Update item quantity
  const updateItem = (productId: number, quantity: number) => {
    const item = items.value.find(i => i.id === productId)
    if (item) {
      item.quantity = quantity
      saveToStorage()
    }
  }

  // Remove item from cart
  const removeItem = (productId: number) => {
    items.value = items.value.filter(item => item.id !== productId)
    saveToStorage()
  }

  // Clear cart
  const clearCart = () => {
    items.value = []
    saveToStorage()
  }

  // Toggle cart visibility
  const toggleCart = () => {
    isOpen.value = !isOpen.value
  }

  // Close cart
  const closeCart = () => {
    isOpen.value = false
  }

  // Computed properties
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const formattedTotal = computed(() => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(totalPrice.value)
  })

  return {
    items,
    isOpen,
    totalItems,
    totalPrice,
    formattedTotal,
    loadFromStorage,
    saveToStorage,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    toggleCart,
    closeCart
  }
}) 
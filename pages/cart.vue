<template>
  <div class="min-h-screen bg-[#131314] pt-20">
    <div class="container mx-auto px-4 py-12">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-white/60 mb-8">
        <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
        <span>/</span>
        <span class="text-white">Warenkorb</span>
      </nav>

      <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>

      <div v-else-if="error" class="text-center text-white/60 py-12">
        {{ error }}
      </div>

      <div v-else-if="!cartStore.items.length" class="text-center py-12">
        <h1 class="text-2xl font-bold text-white mb-4">Ihr Warenkorb ist leer</h1>
        <p class="text-white/60 mb-8">Fügen Sie Produkte hinzu, um Ihren Warenkorb zu füllen.</p>
        <NuxtLink 
          to="/shop" 
          class="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300"
        >
          Zum Shop
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <h1 class="text-2xl font-bold text-white mb-6">Warenkorb</h1>
          
          <div class="space-y-4">
            <div 
              v-for="item in cartStore.items" 
              :key="item.key"
              class="flex gap-4 p-4 bg-white/5 rounded-lg"
            >
              <!-- Product Image -->
              <div class="w-24 h-24 rounded-lg overflow-hidden bg-white/10">
                <img 
                  :src="item.image?.src || '/placeholder.jpg'" 
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Product Info -->
              <div class="flex-1">
                <h3 class="text-white font-medium mb-1">{{ item.name }}</h3>
                <p class="text-white/60 text-sm mb-2">{{ formatPrice(item.price) }}</p>
                
                <!-- Quantity Controls -->
                <div class="flex items-center gap-4">
                  <div class="flex items-center border border-white/10 rounded-lg">
                    <button 
                      @click="updateQuantity(item.key, item.quantity - 1)"
                      class="px-3 py-1 text-white/60 hover:text-white"
                      :disabled="item.quantity <= 1 || cartStore.loading"
                    >
                      -
                    </button>
                    <span class="px-3 py-1 text-white">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.key, item.quantity + 1)"
                      class="px-3 py-1 text-white/60 hover:text-white"
                      :disabled="cartStore.loading"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    @click="removeItem(item.key)"
                    class="text-white/60 hover:text-white transition-colors"
                    :disabled="cartStore.loading"
                  >
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Total -->
              <div class="text-right">
                <p class="text-white font-medium">{{ formatPrice(item.total) }}</p>
              </div>
            </div>
          </div>

          <!-- Clear Cart -->
          <div class="flex justify-end pt-4">
            <button 
              @click="clearCart"
              class="text-white/60 hover:text-white transition-colors flex items-center gap-2"
              :disabled="cartStore.loading"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Warenkorb leeren
            </button>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white/5 rounded-lg p-6">
            <h2 class="text-xl font-bold text-white mb-6">Bestellübersicht</h2>
            
            <div class="space-y-4">
              <div class="flex justify-between text-white/60">
                <span>Zwischensumme</span>
                <span>{{ cartStore.formattedSubtotal }}</span>
              </div>
              
              <div class="flex justify-between text-white/60">
                <span>Versand</span>
                <span>{{ cartStore.formattedShipping }}</span>
              </div>
              
              <div class="flex justify-between text-white/60">
                <span>MwSt.</span>
                <span>{{ cartStore.formattedTax }}</span>
              </div>
              
              <div class="border-t border-white/10 pt-4 flex justify-between text-white font-medium">
                <span>Gesamt</span>
                <span>{{ cartStore.formattedTotal }}</span>
              </div>
            </div>

            <!-- Checkout Button -->
            <button 
              @click="handleCheckout"
              class="w-full mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              :disabled="cartStore.loading || !cartStore.items.length"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span v-if="cartStore.loading">Wird geladen...</span>
              <span v-else>Zur Kasse</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useStripe } from '~/composables/useStripe'
import { useToast } from '~/composables/useToast'

const cartStore = useCartStore()
const { loading: stripeLoading, error: stripeError, redirectToCheckout } = useStripe()
const loading = ref(true)
const error = ref<string | null>(null)

// Format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

// Update item quantity
const updateQuantity = async (itemKey: string, quantity: number) => {
  if (quantity < 1) return
  
  try {
    await cartStore.updateItem(itemKey, quantity)
    const toast = useToast()
    toast.success('Menge aktualisiert')
  } catch (err) {
    console.error('Error updating quantity:', err)
    const toast = useToast()
    toast.error('Fehler beim Aktualisieren der Menge')
  }
}

// Remove item from cart
const removeItem = async (itemKey: string) => {
  try {
    await cartStore.removeItem(itemKey)
    const toast = useToast()
    toast.success('Produkt entfernt')
  } catch (err) {
    console.error('Error removing item:', err)
    const toast = useToast()
    toast.error('Fehler beim Entfernen des Produkts')
  }
}

// Clear cart
const clearCart = async () => {
  try {
    await cartStore.clearCart()
    const toast = useToast()
    toast.success('Warenkorb geleert')
  } catch (err) {
    console.error('Error clearing cart:', err)
    const toast = useToast()
    toast.error('Fehler beim Leeren des Warenkorbs')
  }
}

// Handle checkout
const handleCheckout = async () => {
  try {
    // For now, we'll just redirect to the first item in the cart
    // In a real implementation, you would want to handle multiple items
    const firstItem = cartStore.items[0]
    if (firstItem) {
      await redirectToCheckout(firstItem.id, firstItem.quantity)
    }
  } catch (err) {
    console.error('Error initiating checkout:', err)
    const toast = useToast()
    toast.error('Fehler beim Starten des Checkouts')
  }
}

// Initial data fetch
onMounted(async () => {
  try {
    await cartStore.fetchCart()
  } catch (err) {
    console.error('Error fetching cart:', err)
    error.value = 'Fehler beim Laden des Warenkorbs'
  } finally {
    loading.value = false
  }
})
</script> 
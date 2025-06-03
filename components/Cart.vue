<template>
  <div class="fixed inset-0 bg-black/50 z-50" v-if="isOpen" @click="close">
    <div class="absolute right-0 top-0 h-full w-full max-w-md bg-[#131314] shadow-xl" @click.stop>
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-white/10">
          <h2 class="text-2xl font-bold text-white">Warenkorb</h2>
          <button @click="close" class="text-white/60 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="cartStore.loading" class="flex items-center justify-center h-full">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
          
          <div v-else-if="cartStore.isEmpty" class="flex flex-col items-center justify-center h-full text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p class="text-white/60 text-lg">Ihr Warenkorb ist leer</p>
          </div>

          <div v-else class="space-y-6">
            <div v-for="item in cartStore.items" :key="item.key" class="flex gap-4">
              <div class="relative w-24 h-24 flex-shrink-0">
                <img 
                  :src="item.image.src" 
                  :alt="item.name"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div class="flex-1">
                <h3 class="text-white font-medium">{{ item.name }}</h3>
                <p class="text-white/60 mt-1">{{ formatPrice(item.price) }}</p>
                <div class="flex items-center gap-4 mt-2">
                  <div class="flex items-center border border-white/10 rounded-lg">
                    <button 
                      @click="updateQuantity(item.key, item.quantity - 1)"
                      class="px-3 py-1 text-white/60 hover:text-white"
                      :disabled="item.quantity <= 1"
                    >
                      -
                    </button>
                    <span class="px-3 py-1 text-white">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.key, item.quantity + 1)"
                      class="px-3 py-1 text-white/60 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    @click="removeItem(item.key)"
                    class="text-white/60 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-white/10">
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
            <div class="flex justify-between text-white font-bold text-lg">
              <span>Gesamt</span>
              <span>{{ cartStore.formattedTotal }}</span>
            </div>
          </div>
          <button 
            @click="checkout"
            class="w-full mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 font-medium"
            :disabled="cartStore.isEmpty || cartStore.loading"
          >
            Zur Kasse
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { onMounted, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const cartStore = useCartStore()

// Add debug logging
onMounted(() => {
  console.log('Cart component mounted')
  console.log('Cart state:', {
    items: cartStore.items,
    loading: cartStore.loading,
    error: cartStore.error,
    isEmpty: cartStore.isEmpty
  })
})

watch(() => cartStore.items, (newItems) => {
  console.log('Cart items updated:', newItems)
}, { deep: true })

const close = () => {
  emit('close')
}

const updateQuantity = async (key: string, quantity: number) => {
  if (quantity < 1) return
  await cartStore.updateItem(key, quantity)
}

const removeItem = async (key: string) => {
  await cartStore.removeItem(key)
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const checkout = () => {
  // Implement checkout logic
  console.log('Proceeding to checkout...')
}
</script> 
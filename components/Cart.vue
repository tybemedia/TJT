<template>
  <div>
    <!-- Backdrop -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
      @click="emit('close')"
    ></div>

    <!-- Side Cart -->
    <div 
      class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#131314] border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out"
      :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-white/10">
        <h2 class="text-xl font-bold text-white">Warenkorb</h2>
        <button 
          @click="emit('close')"
          class="text-white/60 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto p-6">
        <div v-if="cartStore.isEmpty" class="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.344 2.065A1 1 0 006.32 6h13.36a1 1 0 01.97 1.243l-1.5 6A1 1 0 0118.18 14H7.82a1 1 0 01-.97-.757L5.21 6.607A1 1 0 006.32 6H21" />
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="17" cy="20" r="1.5" />
          </svg>
          <p class="text-white/60">Ihr Warenkorb ist leer</p>
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
              <h3 class="text-white font-medium mb-1">{{ item.name }}</h3>
              <p class="text-white/60 text-sm mb-2">{{ formatPrice(item.price) }}</p>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <button 
                    @click="updateQuantity(item.key, item.quantity - 1)"
                    class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                  >
                    -
                  </button>
                  <span class="text-white w-8 text-center">{{ item.quantity }}</span>
                  <button 
                    @click="updateQuantity(item.key, item.quantity + 1)"
                    class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                  >
                    +
                  </button>
                </div>
                <button 
                  @click="removeItem(item.key)"
                  class="text-white/40 hover:text-white transition-colors"
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
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const cartStore = useCartStore()

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

<style scoped>
.overflow-y-auto {
  max-height: calc(100vh - 280px);
}
</style> 
<template>
  <div class="fixed inset-y-0 right-0 w-full max-w-md bg-[#131314] shadow-xl transform transition-transform duration-300 ease-in-out"
       :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }">
    <div class="h-full flex flex-col">
      <!-- Header -->
      <div class="px-4 py-4 bg-[#1a1a1b] border-b border-white/10">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-white">Warenkorb</h2>
          <button @click="$emit('close')" class="text-white/60 hover:text-white">
            <span class="sr-only">Close panel</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 px-4 py-4 bg-[#131314]">
        <template v-if="cartStore.items.length === 0">
          <div class="text-center py-8">
            <p class="text-white/60">Ihr Warenkorb ist leer</p>
          </div>
        </template>
        <template v-else>
          <div class="space-y-4">
            <div v-for="item in cartStore.items" :key="item.id" class="flex items-center space-x-3">
              <!-- Product Image -->
              <div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-white/10 bg-white/5">
                <img 
                  :src="item.image" 
                  :alt="item.name" 
                  class="h-full w-full object-cover object-center"
                  @error="(e) => (e.target as HTMLImageElement).src = '/placeholder.jpg'"
                >
              </div>

              <!-- Product Details -->
              <div class="flex-1 min-w-0">
                <div class="flex justify-between">
                  <h3 class="text-sm font-medium text-white truncate">{{ item.name }}</h3>
                  <p class="text-sm font-medium text-white ml-2">{{ formatPrice(item.price * item.quantity) }}</p>
                </div>
                <p class="mt-0.5 text-xs text-white/60">{{ formatPrice(item.price) }} pro Stück</p>

                <!-- Quantity Controls -->
                <div class="mt-2 flex items-center space-x-2">
                  <button 
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="text-white/60 hover:text-white"
                    :disabled="item.quantity <= 1"
                  >
                    <span class="sr-only">Decrease quantity</span>
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <span class="text-sm text-white/60">{{ item.quantity }}</span>
                  <button 
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="text-white/60 hover:text-white"
                  >
                    <span class="sr-only">Increase quantity</span>
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button 
                    @click="removeItem(item.id)"
                    class="ml-2 text-xs font-medium text-white/60 hover:text-white"
                  >
                    Entfernen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Footer -->
      <div class="border-t border-white/10 px-4 py-4 bg-[#1a1a1b]">
        <div class="flex justify-between text-base font-medium text-white">
          <p>Zwischensumme</p>
          <p>{{ cartStore.formattedTotal }}</p>
        </div>
        <p class="mt-0.5 text-xs text-white/60">Versand und Steuern werden im Checkout berechnet.</p>
        <div class="mt-4">
          <button 
            @click="checkout"
            class="w-full flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-[#131314] shadow-sm hover:bg-white/90"
          >
            Zur Kasse
          </button>
        </div>
        <div class="mt-4 flex justify-center text-center text-xs text-white/60">
          <p>
            oder
            <button 
              @click="$emit('close')"
              class="font-medium text-white hover:text-white"
            >
              Weiter einkaufen
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const updateQuantity = (productId: number, quantity: number) => {
  if (quantity < 1) return
  cartStore.updateItem(productId, quantity)
}

const removeItem = (productId: number) => {
  cartStore.removeItem(productId)
}

const checkout = () => {
  // Implement checkout logic here
  console.log('Checkout clicked')
}
</script> 
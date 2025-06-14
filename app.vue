<template>
  <div class="min-h-screen bg-[#131314]">
    <Navbar />
    <NuxtPage />
    <!-- Debug Button -->
    <button 
      @click="debugCart"
      class="fixed bottom-4 right-4 bg-white text-black px-4 py-2 rounded-md"
    >
      Debug Cart
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

// Initialize app
onMounted(() => {
  console.log('App mounted')
  cartStore.loadFromStorage()
})

const debugCart = () => {
  console.log('Cart Items:', cartStore.items)
  console.log('Cart Total:', cartStore.totalItems)
  console.log('Cart Price:', cartStore.totalPrice)
  console.log('Local Storage:', localStorage.getItem('cart'))
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { onMounted } from 'vue'

// Initialize cart on app start
const cartStore = useCartStore()

onMounted(async () => {
  console.log('App mounted, initializing cart...')
  try {
    await cartStore.fetchCart()
    console.log('Cart initialized successfully')
  } catch (error) {
    console.error('Failed to initialize cart:', error)
  }
})
</script>

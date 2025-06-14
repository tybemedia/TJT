<template>
  <button @click="$emit('click')" class="group flex items-center">
    <svg class="h-6 w-6 flex-shrink-0 text-white/60 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
    <span class="ml-2 text-sm font-medium text-white/60 group-hover:text-white">{{ cartStore.totalItems }}</span>
    <span class="sr-only">items in cart, view bag</span>
  </button>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

defineEmits<{
  (e: 'click'): void
}>()
</script> 
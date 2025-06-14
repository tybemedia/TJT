<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#131314]/90 backdrop-blur-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20 relative">
        <!-- Left: Logo -->
        <NuxtLink to="/" class="flex items-center justify-center z-10">
          <img src="https://thejoshuatea.de/wp-content/uploads/2024/12/logo_cropped-1.png" alt="The Joshua Tea Logo" class="h-12 sm:h-16 w-auto object-contain" />
        </NuxtLink>
        <!-- Center: Nav Items (Desktop) -->
        <div class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
          <NuxtLink to="/shop" class="text-white/60 hover:text-white transition-colors font-medium">Shop</NuxtLink>
          <NuxtLink to="/#rezepte" class="text-white/60 hover:text-white transition-colors font-medium">Rezepte</NuxtLink>
          <NuxtLink to="/product?id=202" class="text-white/60 hover:text-white transition-colors font-medium">TJT</NuxtLink>
          <NuxtLink to="/product?id=208" class="text-white/60 hover:text-white transition-colors font-medium">Anbar Gin</NuxtLink>
          <a href="#kontakt" class="text-white/60 hover:text-white transition-colors font-medium">Kontakt</a>
        </div>
        <!-- Right: Cart and Mobile Menu Button -->
        <div class="flex items-center gap-4">
          <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-white/60 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <!-- Basket Icon Cart Button -->
          <div class="relative">
            <button 
              @click="toggleCart"
              class="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <!-- Shopping Cart SVG Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.344 2.065A1 1 0 006.32 6h13.36a1 1 0 01.97 1.243l-1.5 6A1 1 0 0118.18 14H7.82a1 1 0 01-.97-.757L5.21 6.607A1 1 0 006.32 6H21" />
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="17" cy="20" r="1.5" />
              </svg>
              <span class="hidden md:inline">Warenkorb</span>
              <span 
                v-if="cartStore.itemCount > 0"
                class="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ cartStore.itemCount }}
              </span>
            </button>
            <Cart :is-open="isCartOpen" @close="closeCart" />
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile menu -->
    <div 
      v-if="isMenuOpen"
      class="md:hidden bg-[#131314] border-t border-white/10"
    >
      <div class="container mx-auto px-4 py-4 flex flex-col gap-2">
        <NuxtLink to="/shop" class="block py-2 text-white/60 hover:text-white transition-colors font-medium" @click="isMenuOpen = false">Shop</NuxtLink>
        <NuxtLink to="/#rezepte" class="block py-2 text-white/60 hover:text-white transition-colors font-medium" @click="isMenuOpen = false">Rezepte</NuxtLink>
        <NuxtLink to="/product?id=202" class="block py-2 text-white/60 hover:text-white transition-colors font-medium" @click="isMenuOpen = false">TJT</NuxtLink>
        <NuxtLink to="/product?id=208" class="block py-2 text-white/60 hover:text-white transition-colors font-medium" @click="isMenuOpen = false">Anbar Gin</NuxtLink>
        <a href="#kontakt" class="block py-2 text-white/60 hover:text-white transition-colors font-medium" @click="isMenuOpen = false">Kontakt</a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Cart from '~/components/Cart.vue'
import { useCartStore } from '~/stores/cart'

const isMenuOpen = ref(false)
const isCartOpen = ref(false)
const cartStore = useCartStore()

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value
}

const closeCart = () => {
  isCartOpen.value = false
}
</script> 
<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#131314]/80 backdrop-blur-lg border-b border-white/10">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <!-- Left: Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-white">
          The Joshua Tea
        </NuxtLink>

        <!-- Center: Navigation Links -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink to="/" class="text-white/60 hover:text-white transition-colors">
            Home
          </NuxtLink>
          <NuxtLink to="/shop" class="text-white/60 hover:text-white transition-colors">
            Shop
          </NuxtLink>
          <NuxtLink to="/about" class="text-white/60 hover:text-white transition-colors">
            About
          </NuxtLink>
          <NuxtLink to="/contact" class="text-white/60 hover:text-white transition-colors">
            Contact
          </NuxtLink>
        </div>

        <!-- Right: Cart and Mobile Menu -->
        <div class="flex items-center gap-4">
          <CartButton @click="isCartOpen = true" class="text-white/60 hover:text-white transition-colors" />
          <button 
            @click="toggleMenu"
            class="md:hidden text-white/60 hover:text-white transition-colors"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen"
      class="md:hidden bg-[#131314] border-t border-white/10"
    >
      <div class="container mx-auto px-4 py-4 space-y-4">
        <NuxtLink 
          to="/"
          class="block text-white/60 hover:text-white transition-colors"
          @click="closeMenu"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/shop"
          class="block text-white/60 hover:text-white transition-colors"
          @click="closeMenu"
        >
          Shop
        </NuxtLink>
        <NuxtLink 
          to="/about"
          class="block text-white/60 hover:text-white transition-colors"
          @click="closeMenu"
        >
          About
        </NuxtLink>
        <NuxtLink 
          to="/contact"
          class="block text-white/60 hover:text-white transition-colors"
          @click="closeMenu"
        >
          Contact
        </NuxtLink>
      </div>
    </div>

    <!-- Cart -->
    <Cart :is-open="isCartOpen" @close="isCartOpen = false" />
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)
const isCartOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script> 
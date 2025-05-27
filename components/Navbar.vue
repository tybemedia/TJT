<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#131314]/80 backdrop-blur-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <NuxtLink to="/" class="text-2xl font-bold text-white">
          The Joshua Tea
        </NuxtLink>

        <div class="hidden md:flex items-center gap-8">
          <NuxtLink 
            v-for="item in navigation" 
            :key="item.href"
            :to="item.href"
            class="text-white/60 hover:text-white transition-colors"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4">
          <CartButton />
          <button 
            class="md:hidden text-white/60 hover:text-white"
            @click="isMenuOpen = !isMenuOpen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div 
      v-if="isMenuOpen"
      class="md:hidden bg-[#131314] border-t border-white/10"
    >
      <div class="container mx-auto px-4 py-4">
        <NuxtLink 
          v-for="item in navigation" 
          :key="item.href"
          :to="item.href"
          class="block py-2 text-white/60 hover:text-white transition-colors"
          @click="isMenuOpen = false"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const navigation = [
  { name: 'Start', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Rezepte', href: '/recipes' },
  { name: 'TJT', href: '/products' },
  { name: 'Anbar Gin', href: '/anbar-gin' },
  { name: 'Über uns', href: '/about' },
  { name: 'Kontakt', href: '/contact' },
]
</script> 
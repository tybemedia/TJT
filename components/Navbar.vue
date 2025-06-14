<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#131314]/80 backdrop-blur-lg border-b border-white/10">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-28">
        <!-- Left: Logo -->
        <NuxtLink to="/" class="flex items-center">
          <img 
            src="https://thejoshuatea.de/wp-content/uploads/2024/07/04_Wort-Bild-SW-logoTJT-Negativ-2.png" 
            alt="The Joshua Tea Logo" 
            class="h-24 w-auto"
          />
        </NuxtLink>

        <!-- Center: Navigation Links -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink to="/products" class="text-white/60 hover:text-white transition-colors">
            Unsere Klassiker
          </NuxtLink>
          <NuxtLink to="/product?id=202" class="text-white/60 hover:text-white transition-colors">
            TJT
          </NuxtLink>
          <NuxtLink to="/product?id=205" class="text-white/60 hover:text-white transition-colors">
            Anbar
          </NuxtLink>
          <a href="/#TJT-Rezepte" class="text-white/60 hover:text-white transition-colors">
            Rezepte
          </a>
          <NuxtLink to="/#kontakt" class="text-white/60 hover:text-white transition-colors">
            Kontakt
          </NuxtLink>
        </div>

        <!-- Right: Cart and Mobile Menu -->
        <div class="flex items-center gap-4">
          <CartButton @click="cartStore.toggleCart" class="text-white/60 hover:text-white transition-colors" />
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
          to="/products"
          class="block text-white/60 hover:text-white transition-colors"
          @click="closeMenu"
        >
          Unsere Klassiker
        </NuxtLink>
        <NuxtLink 
          to="/product?id=202"
          class="block text-white/60 hover:text-white transition-colors"
          @click="closeMenu"
        >
          TJT
        </NuxtLink>
        <NuxtLink 
          to="/product?id=205"
          class="block text-white/60 hover:text-white transition-colors"
          @click="closeMenu"
        >
          Anbar
        </NuxtLink>
        <a 
          href="/#TJT-Rezepte"
          class="block text-white/60 hover:text-white transition-colors"
          @click="closeMenu"
        >
          Rezepte
        </a>
        <NuxtLink 
          to="/#contact-form"
          class="block text-white/60 hover:text-white transition-colors"
          @click="closeMenu"
        >
          Kontakt
        </NuxtLink>
      </div>
    </div>

    <!-- Cart -->
    <Cart />
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const scrollToRecipes = () => {
  if (router.currentRoute.value.path === '/') {
    const recipesSection = document.getElementById('rezepte')
    if (recipesSection) {
      recipesSection.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    router.push('/')
    // Wait for the page to load before scrolling
    setTimeout(() => {
      const recipesSection = document.getElementById('rezepte')
      if (recipesSection) {
        recipesSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
}

const scrollToRecipesAndCloseMenu = () => {
  closeMenu()
  scrollToRecipes()
}

const scrollToContact = () => {
  const contactForm = document.getElementById('kontakt')
  if (contactForm) {
    contactForm.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToContactAndCloseMenu = () => {
  closeMenu()
  scrollToContact()
}
</script> 
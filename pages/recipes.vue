<template>
  <div class="min-h-screen bg-[#131314] text-white">
    <div class="container mx-auto py-24">
      <h1 class="text-5xl font-bold mb-12 text-center">Rezepte</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div
          v-for="recipe in recipes"
          :key="recipe.id"
          class="bg-white/5 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer group"
          @click="openRecipe(recipe)"
        >
          <img :src="getRecipeImage(recipe)" :alt="recipe.title.rendered" class="w-full h-64 object-cover group-hover:brightness-110 transition-all duration-300" />
          <div class="p-6">
            <h2 class="text-2xl font-bold mb-2 text-white">{{ recipe.title.rendered }}</h2>
            <div class="text-white/70 line-clamp-3" v-html="recipe.excerpt.rendered"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recipe Popup Modal -->
    <div v-if="selectedRecipe" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div class="relative bg-[#23232a] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 animate-fade-in">
        <button @click="selectedRecipe = null" class="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-bold">&times;</button>
        <img :src="getRecipeImage(selectedRecipe)" :alt="selectedRecipe.title.rendered" class="w-full h-72 object-cover rounded-xl mb-6" />
        <h2 class="text-3xl font-bold mb-4 text-white">{{ selectedRecipe.title.rendered }}</h2>
        <div class="prose prose-invert max-w-none text-white/90" v-html="selectedRecipe.content.rendered"></div>
      </div>
    </div>

    <!-- Unsere Klassiker Section -->
    <section class="py-24 border-t border-white/10 mt-24">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-center mb-16 gap-4 select-none">
          <div class="flex-1 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
          <h2 class="text-5xl font-bold text-white tracking-tight text-center">Unsere Klassiker</h2>
          <div class="flex-1 h-1 bg-gradient-to-l from-transparent via-white/20 to-transparent rounded-full"></div>
        </div>
        <div v-if="klassikerLoading" class="text-center text-white text-lg py-12">Produkte werden geladen...</div>
        <div v-else-if="klassikerError" class="text-center text-red-500 text-lg py-12">{{ klassikerError }}</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <NuxtLink
            v-for="product in klassikerProducts"
            :key="product.id"
            :to="`/product?id=${product.id}`"
            class="text-center group hover:transform hover:scale-105 transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            tabindex="0"
          >
            <div class="relative aspect-[3/4] mb-6 overflow-hidden rounded-xl bg-white/5">
              <img 
                :src="product.images[0]?.src || ''" 
                :alt="product.images[0]?.alt || product.name" 
                class="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 class="text-2xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors">{{ product.name }}</h3>
            <p class="text-white/60 text-lg">{{ formatPrice(product.price) }}</p>
            <span class="block mt-4 text-primary-400 group-hover:text-primary-300 font-medium underline underline-offset-4">Mehr erfahren</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useWooCommerce } from '~/composables/useWooCommerce'
import type { WooProduct } from '~/types/woocommerce'

const recipes = ref<any[]>([])
const selectedRecipe = ref<any | null>(null)

// Fetch recipes from WordPress REST API (category 'rezepte' or 'recipes')
onMounted(async () => {
  try {
    // Adjust the category or endpoint as needed
    const res = await fetch('https://thejoshuatea.de/wp-json/wp/v2/posts?categories=8&_embed')
    recipes.value = await res.json()
  } catch (e) {
    recipes.value = []
  }
})

function getRecipeImage(recipe: any) {
  // Try to get the featured image from _embedded
  return recipe._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'
}

function openRecipe(recipe: any) {
  selectedRecipe.value = recipe
}

// Unsere Klassiker Section logic
const wooCommerce = useWooCommerce()
const klassikerProductIds = [202, 205, 208]
const klassikerProducts = ref<WooProduct[]>([])
const klassikerLoading = ref(true)
const klassikerError = ref<string | null>(null)

function formatPrice(price: string | number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(Number(price))
}

onMounted(async () => {
  klassikerLoading.value = true
  klassikerError.value = null
  try {
    const products = await Promise.all(
      klassikerProductIds.map(id => wooCommerce.getProduct(id))
    )
    klassikerProducts.value = products
  } catch (err) {
    klassikerError.value = 'Produkte konnten nicht geladen werden.'
  } finally {
    klassikerLoading.value = false
  }
})
</script>

<style scoped>
.prose :where(img) {
  margin: 1.5rem 0;
  border-radius: 1rem;
  box-shadow: 0 4px 24px 0 #0004;
}
.animate-fade-in {
  animation: fadeIn 0.3s cubic-bezier(.4,0,.2,1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
</style> 
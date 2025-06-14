<template>
  <div class="min-h-screen bg-[#131314] pt-20">
    <div class="container mx-auto px-4 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">Shop</h1>
        <p class="text-white/60 max-w-2xl mx-auto">
          Entdecken Sie unsere Auswahl an hochwertigen Tees und Spirituosen.
        </p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-4 mb-8">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="selectedCategory = category.id"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="selectedCategory === category.id ? 'bg-primary-500 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Products Grid -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="n in 8" :key="n" class="animate-pulse">
          <div class="aspect-square bg-white/5 rounded-xl mb-4"></div>
          <div class="h-4 bg-white/5 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-white/5 rounded w-1/2"></div>
        </div>
      </div>

      <div v-else-if="error" class="text-center text-white/60 py-12">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="group"
        >
          <NuxtLink :to="`/product?id=${product.id}`" class="block">
            <div class="aspect-square relative rounded-xl overflow-hidden bg-white/5 mb-4">
              <img 
                :src="product.featured_image || product.images[0]?.src || '/placeholder.jpg'" 
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div 
                v-if="product.on_sale"
                class="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                Sale
              </div>
            </div>
            <h3 class="text-lg font-medium text-white mb-2">{{ product.name }}</h3>
            <div class="flex items-center gap-2">
              <span 
                v-if="product.on_sale"
                class="text-white/60 line-through"
              >
                {{ formatPrice(product.regular_price) }}
              </span>
              <span class="text-white font-medium">
                {{ formatPrice(product.price) }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { WooProduct, WooCategory } from '~/types/woocommerce'
import { useWooCommerce } from '~/composables/useWooCommerce'

const wooCommerce = useWooCommerce()

const products = ref<WooProduct[]>([])
const categories = ref<WooCategory[]>([])
const selectedCategory = ref<number | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Format price
const formatPrice = (price: string | number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(Number(price))
}

// Filter products by category
const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products.value
  return products.value.filter(product => 
    product.categories.some(category => category.id === selectedCategory.value)
  )
})

// Fetch products and categories
const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const [productsData, categoriesData] = await Promise.all([
      wooCommerce.getProducts(),
      wooCommerce.getCategories()
    ])
    products.value = productsData
    categories.value = categoriesData
  } catch (err) {
    console.error('Error loading shop data:', err)
    error.value = 'Failed to load products'
  } finally {
    loading.value = false
  }
}

// Initial data fetch
onMounted(() => {
  console.log('Shop page mounted')
  fetchData()
})
</script> 
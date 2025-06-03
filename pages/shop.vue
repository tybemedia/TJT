<template>
  <div class="min-h-screen bg-[#131314] pt-20">
    <div class="container mx-auto px-4 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Unser Shop</h1>
        <p class="text-white/60 max-w-2xl mx-auto">
          Entdecken Sie unsere handverlesene Auswahl an Premium-Tees, sorgfältig ausgewählt für ein unvergessliches Geschmackserlebnis.
        </p>
      </div>

      <!-- Filters and Sort -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <select 
          v-model="sortBy"
          class="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
        >
          <option value="date">Neueste</option>
          <option value="price">Preis aufsteigend</option>
          <option value="price-desc">Preis absteigend</option>
          <option value="popularity">Beliebtheit</option>
        </select>
      </div>

      <!-- Products Grid -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>

      <div v-else-if="error" class="text-red-500 text-center py-12">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
        >
          <NuxtLink 
            :to="`/product?id=${product.id}`"
            class="block"
            @click="console.log('Product clicked:', product.id)"
          >
            <div class="relative aspect-square">
              <img 
                :src="product.images[0]?.src" 
                :alt="product.name"
                class="w-full h-full object-cover"
              >
              <div 
                v-if="product.sale_price"
                class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm"
              >
                Sale
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
              <div class="flex items-center gap-2">
                <span 
                  v-if="product.sale_price"
                  class="text-red-500 font-semibold"
                >
                  {{ formatPrice(product.sale_price) }}
                </span>
                <span 
                  :class="[
                    'font-semibold',
                    product.sale_price ? 'text-white/60 line-through' : 'text-white'
                  ]"
                >
                  {{ formatPrice(product.price) }}
                </span>
              </div>
            </div>
          </NuxtLink>
          <div class="p-4 pt-0">
            <button 
              @click.stop="addToCart(product.id)"
              :disabled="cartStore.loading"
              class="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ cartStore.loading ? 'Wird hinzugefügt...' : 'In den Warenkorb' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useWooCommerce } from '~/composables/useWooCommerce'
import { useCartStore } from '~/stores/cart'
import type { WooProduct } from '~/types/woocommerce'

const wooCommerce = useWooCommerce()
const cartStore = useCartStore()

const products = ref<WooProduct[]>([])
const categories = ref<{ id: number; name: string }[]>([])
const selectedCategory = ref<number | null>(null)
const sortBy = ref('date')
const loading = ref(true)
const error = ref<string | null>(null)

// Test API connection
const testApiConnection = async () => {
  try {
    console.log('Testing API connection...')
    await wooCommerce.testConnection()
    console.log('API connection successful')
    return true
  } catch (err) {
    console.error('API connection test failed:', err)
    error.value = err instanceof Error ? err.message : 'Failed to connect to WooCommerce API'
    return false
  }
}

// Fetch products and categories
const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    // First test the connection
    const isConnected = await testApiConnection()
    if (!isConnected) {
      return
    }

    console.log('Fetching products...')
    const productsData = await wooCommerce.getProducts()
    console.log('Products fetched:', productsData)
    
    // Log product slugs for debugging
    productsData.forEach(product => {
      console.log(`Product: ${product.name}, Slug: ${product.slug}`)
    })
    
    // Get categories from the first product's categories
    if (productsData.length > 0) {
      const uniqueCategories = new Map()
      productsData.forEach(product => {
        product.categories.forEach(category => {
          if (!uniqueCategories.has(category.id)) {
            uniqueCategories.set(category.id, {
              id: category.id,
              name: category.name
            })
          }
        })
      })
      categories.value = Array.from(uniqueCategories.values())
      console.log('Categories extracted:', categories.value)
    }

    products.value = productsData
  } catch (err) {
    console.error('Error fetching data:', err)
    error.value = err instanceof Error ? err.message : 'Failed to fetch products'
  } finally {
    loading.value = false
  }
}

// Filter and sort products
const filteredProducts = computed(() => {
  // Only show products that have a category named 'Launched'
  let filtered = products.value.filter(product =>
    product.categories.some(cat => cat.name === 'Launched')
  )

  switch (sortBy.value) {
    case 'price':
      filtered.sort((a, b) => Number(a.price) - Number(b.price))
      break
    case 'price-desc':
      filtered.sort((a, b) => Number(b.price) - Number(a.price))
      break
    case 'popularity':
      filtered.sort((a, b) => b.total_sales - a.total_sales)
      break
    default: // date
      filtered.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime())
  }

  return filtered
})

// Format price
const formatPrice = (price: string | number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(Number(price))
}

// Add to cart
const addToCart = async (productId: number) => {
  try {
    await cartStore.addItem(productId)
  } catch (err) {
    console.error('Error adding to cart:', err)
    error.value = err instanceof Error ? err.message : 'Failed to add item to cart'
  }
}

// Initial fetch
onMounted(() => {
  console.log('Shop page mounted')
  fetchData()
})
</script> 
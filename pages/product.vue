<template>
  <div class="min-h-screen bg-[#131314] pt-20">
    <div v-if="loading" class="container mx-auto px-4 py-12">
      <div class="flex justify-center items-center min-h-[400px]">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    </div>

    <div v-else-if="error" class="container mx-auto px-4 py-12">
      <div class="text-center text-white/60 py-12">
        {{ error }}
      </div>
    </div>

    <div v-else-if="product" class="container mx-auto px-4 py-12">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-white/60 mb-8">
        <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
        <span>/</span>
        <NuxtLink to="/shop" class="hover:text-white transition-colors">Shop</NuxtLink>
        <span>/</span>
        <span class="text-white">{{ product.name }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Images -->
        <div class="space-y-4">
          <div class="aspect-square relative rounded-xl overflow-hidden bg-white/5">
            <img 
              :src="selectedImage?.src || product.featured_image || product.images[0]?.src || '/placeholder.jpg'" 
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <div 
              v-if="product.on_sale"
              class="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium"
            >
              Sale
            </div>
          </div>
          <div v-if="product.images.length > 0" class="grid grid-cols-4 gap-4">
            <button 
              v-for="image in product.images" 
              :key="image.id"
              @click="selectedImage = image"
              class="aspect-square rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
              :class="{ 'ring-2 ring-primary-500': selectedImage?.id === image.id }"
            >
              <img 
                :src="image.src" 
                :alt="image.alt || product.name"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">{{ product.name }}</h1>
            <div class="flex items-center gap-2">
              <span 
                v-if="product.on_sale"
                class="text-white/60 line-through"
              >
                {{ formatPrice(product.regular_price) }}
              </span>
              <span class="text-2xl text-white font-medium">
                {{ formatPrice(product.price) }}
              </span>
            </div>
          </div>

          <div class="prose prose-invert max-w-none">
            <div v-if="product.short_description" v-html="cleanDescription(product.short_description)"></div>
          </div>

          <!-- Product Meta -->
          <div class="space-y-4">
            <div v-if="product.sku" class="flex items-center gap-2 text-white/60">
              <span class="font-medium">SKU:</span>
              <span>{{ product.sku }}</span>
            </div>
            <div v-if="product.categories.length" class="flex items-center gap-2 text-white/60">
              <span class="font-medium">Kategorien:</span>
              <div class="flex gap-2">
                <NuxtLink 
                  v-for="category in product.categories" 
                  :key="category.id"
                  :to="`/shop?category=${category.id}`"
                  class="hover:text-white transition-colors"
                >
                  {{ category.name }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Full Description -->
          <div class="prose prose-invert max-w-none pt-8 border-t border-white/10">
            <h2 class="text-xl font-bold text-white mb-4">Produktbeschreibung</h2>
            <div v-if="product.description" v-html="cleanDescription(product.description)"></div>
          </div>

          <!-- Add to Cart Section -->
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div class="flex items-center border border-white/10 rounded-lg">
                <button 
                  @click="quantity > 1 && quantity--"
                  class="px-4 py-2 text-white/60 hover:text-white"
                >
                  <span class="sr-only">Decrease quantity</span>
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <span class="px-4 py-2 text-white">{{ quantity }}</span>
                <button 
                  @click="quantity++"
                  class="px-4 py-2 text-white/60 hover:text-white"
                >
                  <span class="sr-only">Increase quantity</span>
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            <button 
              @click="addToCart"
              class="w-full flex items-center justify-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-[#131314] shadow-sm hover:bg-white/90"
            >
              In den Warenkorb
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { WooProduct, WooImage } from '~/types/woocommerce'
import { useWooCommerce } from '~/composables/useWooCommerce'
import { useRoute } from 'vue-router'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const wooCommerce = useWooCommerce()
const cartStore = useCartStore()

const product = ref<WooProduct | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const selectedImage = ref<WooImage | null>(null)
const quantity = ref(1)

// Format price
const formatPrice = (price: string | number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(Number(price))
}

// Clean up Divi Builder shortcodes
const cleanDescription = (html: string) => {
  if (!html) return ''
  // Remove all [et_pb_*]...[/et_pb_*] blocks and any standalone [et_pb_*] or [/et_pb_*] tags
  return html
    .replace(/\[et_pb_[^\]]*\][\s\S]*?\[\/et_pb_[^\]]*\]/g, '') // Remove blocks
    .replace(/\[et_pb_[^\]]*\]/g, '') // Remove standalone opening tags
    .replace(/\[\/et_pb_[^\]]*\]/g, '') // Remove standalone closing tags
    .replace(/\[\/et_pb_section\]/g, '')
    .replace(/\[\/et_pb_row\]/g, '')
    .replace(/\[\/et_pb_column\]/g, '')
    .replace(/\[\/et_pb_wc_[^\]]*\]/g, '')
    .replace(/\[et_pb_section[^\]]*\]/g, '')
    .replace(/\[et_pb_row[^\]]*\]/g, '')
    .replace(/\[et_pb_column[^\]]*\]/g, '')
    .replace(/\[et_pb_wc_[^\]]*\]/g, '')
    .trim()
}

// Fetch product data
const fetchProduct = async () => {
  loading.value = true
  error.value = null
  try {
    const productId = route.query.id
    console.log('Fetching product with ID:', productId)
    
    if (!productId) {
      error.value = 'No product ID provided'
      return
    }

    const productData = await wooCommerce.getProduct(Number(productId))
    console.log('Product loaded:', productData)
    
    if (productData) {
      product.value = productData
      selectedImage.value = product.value.images[0] || null
      console.log('Product description:', product.value.description)
      console.log('Product short description:', product.value.short_description)
    } else {
      console.error('No product found with ID:', productId)
      error.value = 'Product not found'
    }
  } catch (err) {
    console.error('Error loading product:', err)
    error.value = 'Failed to load product'
  } finally {
    loading.value = false
  }
}

// Watch for route changes
watch(
  () => route.query.id,
  (newId) => {
    if (newId) {
      console.log('Product ID changed:', newId)
      fetchProduct()
    }
  },
  { immediate: true }
)

// Initial data fetch
onMounted(async () => {
  console.log('Product page mounted')
  console.log('Route query:', route.query)
  await fetchProduct()
})

const addToCart = () => {
  if (!product.value) return

  console.log('Adding product to cart:', {
    id: product.value.id,
    name: product.value.name,
    price: parseFloat(product.value.price),
    image: product.value.images[0]?.src || '/placeholder.jpg',
    quantity: quantity.value
  })

  cartStore.addItem({
    id: product.value.id,
    name: product.value.name,
    price: parseFloat(product.value.price),
    image: product.value.images[0]?.src || '/placeholder.jpg',
    quantity: quantity.value
  })

  // Reset quantity after adding to cart
  quantity.value = 1
}
</script> 
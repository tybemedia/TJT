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

          <!-- Add to Cart -->
          <div class="flex items-center gap-4">
            <div class="flex items-center border border-white/10 rounded-lg">
              <button 
                @click="quantity > 1 && quantity--"
                class="px-4 py-2 text-white/60 hover:text-white"
                :disabled="quantity <= 1"
              >
                -
              </button>
              <span class="px-4 py-2 text-white">{{ quantity }}</span>
              <button 
                @click="quantity++"
                class="px-4 py-2 text-white/60 hover:text-white"
              >
                +
              </button>
            </div>
            <button 
              @click="addToCart"
              class="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="cartStore.loading || !product.purchasable"
            >
              <span v-if="cartStore.loading">Wird hinzugefügt...</span>
              <span v-else>In den Warenkorb</span>
            </button>
          </div>

          <!-- Full Description -->
          <div class="prose prose-invert max-w-none pt-8 border-t border-white/10">
            <h2 class="text-xl font-bold text-white mb-4">Produktbeschreibung</h2>
            <div v-if="product.description" v-html="product.description"></div>
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
import { useCartStore } from '~/stores/cart'
import { useRoute } from 'vue-router'

const route = useRoute()
const wooCommerce = useWooCommerce()
const cartStore = useCartStore()

const product = ref<WooProduct | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const quantity = ref(1)
const selectedImage = ref<WooImage | null>(null)

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
  console.log('Cleaning description:', html)
  // Remove both opening and closing Divi Builder shortcodes
  const cleaned = html
    .replace(/\[et_pb_[^\]]*\]/g, '') // Remove opening tags
    .replace(/\[\/et_pb_[^\]]*\]/g, '') // Remove closing tags
    .replace(/\[\/et_pb_section\]/g, '') // Remove section closing tag
    .replace(/\[\/et_pb_row\]/g, '') // Remove row closing tag
    .replace(/\[\/et_pb_column\]/g, '') // Remove column closing tag
    .replace(/\[\/et_pb_wc_[^\]]*\]/g, '') // Remove all WooCommerce module closing tags
    .trim() // Remove any extra whitespace
  console.log('Cleaned description:', cleaned)
  return cleaned
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

// Add to cart
const addToCart = async () => {
  if (!product.value) return
  try {
    console.log('Adding to cart:', { productId: product.value.id, quantity: quantity.value })
    await cartStore.addItem(product.value.id, quantity.value)
    // Refresh cart data after adding item
    await cartStore.fetchCart()
    console.log('Cart updated:', cartStore.items)
  } catch (err) {
    console.error('Error adding to cart:', err)
  }
}

// Initial data fetch
onMounted(async () => {
  console.log('Product page mounted')
  console.log('Route query:', route.query)
  await fetchProduct()
  // Fetch initial cart data
  await cartStore.fetchCart()
})
</script> 
<template>
  <div class="min-h-screen relative overflow-hidden bg-[#131314]">
    <AgeVerification @verified="handleVerified" />
    <div v-if="isAgeVerified" class="relative z-10">
      <!-- Decorative Background Elements -->
      <div class="pointer-events-none absolute inset-0 z-0">
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30"></div>
        <!-- Particles -->
        <div class="absolute inset-0" id="particles"></div>
      </div>
      <!-- Main Content -->
      <div class="relative z-10">
        <div class="mt-20">
          <HeroSection />
        </div>
        <!-- Products Section -->
        <section class="py-24">
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
        <!-- Recipes Section -->
        <section class="py-24 border-t border-white/10">
          <div class="container mx-auto px-4">
            <div class="flex items-center justify-center mb-16 gap-4 select-none">
              <div class="flex-1 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
              <h2 class="text-5xl font-bold text-white tracking-tight text-center">Rezepte</h2>
              <div class="flex-1 h-1 bg-gradient-to-l from-transparent via-white/20 to-transparent rounded-full"></div>
            </div>
            <div class="relative max-w-5xl mx-auto px-16">
              <Swiper v-bind="swiperOptions" class="recipes-slider">
                <SwiperSlide v-for="(recipe, index) in recipes" :key="recipe.name">
                  <div class="text-center group hover:transform hover:scale-105 transition-all duration-300">
                    <div class="relative aspect-[3/4] mb-6 overflow-hidden rounded-xl">
                      <img 
                        :src="recipeImages[index]" 
                        :alt="recipe.name" 
                        class="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 class="text-2xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors">{{ recipe.name }}</h3>
                    <button class="text-primary-400 hover:text-primary-300 font-medium flex items-center gap-2 justify-center group-hover:translate-x-2 transition-transform">
                      Zum Rezept
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </SwiperSlide>
              </Swiper>
              
              <!-- Navigation Buttons -->
              <div class="swiper-button-prev !text-white after:!text-2xl !-left-12"></div>
              <div class="swiper-button-next !text-white after:!text-2xl !-right-12"></div>
              
              <!-- Pagination -->
              <div class="swiper-pagination !bottom-[-40px]"></div>
            </div>
          </div>
        </section>
        <!-- About Section -->
        <section class="py-24 border-t border-white/10">
          <div class="container mx-auto px-4">
            <!-- Section 1: Herkunft & Inspiration -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
              <div class="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img 
                  src="https://thejoshuatea.de/wp-content/uploads/2024/12/J68A8494.jpg" 
                  alt="Joshua Tree National Park" 
                  class="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 class="text-4xl font-bold mb-8 text-white tracking-tight">TJT – Ein Likör wie kein anderer</h2>
                <div class="prose prose-lg prose-invert prose-headings:font-bold prose-p:text-white/80">
                  <p class="mb-6 text-lg leading-relaxed">
                    The Joshua Tea (TJT) vereint die spirituelle Weite des Joshua Tree Nationalparks mit der Finesse japanischer Teekunst und deutscher Destillationspräzision. Fruchtiger Pfirsich trifft auf eleganten Earl Grey – für ein unverwechselbares, modernes Geschmackserlebnis mit Tiefgang.
                  </p>
                </div>
              </div>
            </div>

            <!-- Section 2: Anspruchsvoller Genuss -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
              <div class="order-2 md:order-1">
                <h2 class="text-4xl font-bold mb-8 text-white tracking-tight">Luxus für den Augenblick</h2>
                <div class="prose prose-lg prose-invert prose-headings:font-bold prose-p:text-white/80">
                  <p class="mb-6 text-lg leading-relaxed">
                    TJT ist kein gewöhnlicher Likör – er ist ein Statement. Ob auf Eis, im Spritz oder mit Champagner: Jede Komposition lädt ein, Genuss bewusster zu zelebrieren. Handveredelt in Deutschland. Stilvoll. Besonders.
                  </p>
                </div>
              </div>
              <div class="relative aspect-[4/3] rounded-xl overflow-hidden order-1 md:order-2">
                <img 
                  src="https://thejoshuatea.de/wp-content/uploads/2024/10/J68A7683.jpg" 
                  alt="TJT Cocktail" 
                  class="object-cover w-full h-full"
                />
              </div>
            </div>

            <!-- Section 3: Tradition & Moderne -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div class="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img 
                  src="https://thejoshuatea.de/wp-content/uploads/2024/12/TJT-Cocktails.jpg"
                  alt="TJT Bottle" 
                  class="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 class="text-4xl font-bold mb-8 text-white tracking-tight">Eleganz, die bleibt</h2>
                <div class="prose prose-lg prose-invert prose-headings:font-bold prose-p:text-white/80">
                  <p class="mb-6 text-lg leading-relaxed">
                    Mit The Joshua Tea erleben Sie Genuss, der über den Moment hinaus wirkt. Natürliche Zutaten, kultivierte Aromen und handwerkliche Vollendung machen TJT zum Inbegriff moderner Eleganz – für Menschen mit Sinn für das Außergewöhnliche.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <InstagramFeed />
        <section class="py-20">
          <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-12">Häufige Fragen</h2>
            <div class="space-y-6">
              <div v-for="faq in faqs" :key="faq.question" 
                   class="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all duration-300">
                <h3 class="text-2xl font-semibold mb-4 text-white">{{ faq.question }}</h3>
                <p class="text-white/80 text-lg leading-relaxed">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </section>
        <!-- Newsletter Section -->
        <section class="py-24 border-t border-white/10">
          <div class="container mx-auto px-4 max-w-2xl text-center">
            <div class="relative aspect-[16/9] mb-12 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60" 
                alt="TJT Cocktail" 
                class="object-cover w-full h-full"
              />
            </div>
            <h2 class="text-4xl font-bold mb-6 text-white tracking-tight">Kein Update verpassen</h2>
            <p class="text-white/80 text-lg mb-10 leading-relaxed">
              Entdecke die Welt von The Joshua Tea! Trag dich in unseren Newsletter ein und bleib immer auf dem Laufenden über exklusive Angebote, Events und spannende Neuigkeiten.
            </p>
            <form class="flex gap-4 justify-center">
              <input 
                type="email" 
                placeholder="E-Mail-Adresse" 
                class="px-6 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-white/50 w-full max-w-md transition-all duration-300 hover:bg-white/10"
              >
              <button type="submit" 
                      class="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 font-medium whitespace-nowrap">
                Abonnieren
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { WooProduct } from '~/types/woocommerce'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import InstagramFeed from '~/components/InstagramFeed.vue'
import AgeVerification from '~/components/AgeVerification.vue'
import { useWooCommerce } from '~/composables/useWooCommerce'

definePageMeta({
  layout: 'default'
})

const recipes = [
  { name: 'TJT — Wild Berry' },
  { name: 'TJT — Sour' },
  { name: 'TJT-Gimlet' },
  { name: 'TJT-Spritz' },
  { name: 'TJT de Luxe' },
  { name: 'TJT — Coco-Sour' },
  { name: 'TJT — Maracuja-Limette' },
  { name: 'TJTini' },
  { name: 'TJT — Tonic' }
]

const recipeImages = [
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=60', // Wild Berry - Red cocktail with berries
  'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=60', // Sour - Classic whiskey sour
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60', // Gimlet - Fresh lime cocktail
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60', // Spritz - Aperol spritz style
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60', // De Luxe - Elegant cocktail
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=60', // Coco-Sour - Tropical cocktail
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60', // Maracuja - Exotic cocktail
  'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=60', // TJTini - Martini style
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60'  // Tonic - Gin and tonic style
]

const faqs = [
  {
    question: 'Was ist The Joshua Tea?',
    answer: 'The Joshua Tea (TJT) basiert auf einem Weizendestillat mit 22% Alk. Vol. mit starker Pfirsichnote, welcher durch Earl Grey Tee gefiltert wurde. Die Kombination aus Frische und herben Geschmackselementen macht TJT makant und einzigartig.'
  },
  {
    question: 'Womit mixt man The Joshua Tea?',
    answer: '(Fast) alles was das Herz begehrt — Das kommt auf den Anlass an, denn TJT ist vielseitig. Für die Aperitif-Zeit Klassische Drinks lassen sich klassische Filter wie Tonic, Wild Berry oder wie auch neue Kreationen passend zu aktuellen Trends sind möglich.'
  },
  {
    question: 'Wann trinkt man The Joshua Tea?',
    answer: 'Bei guter Stimmung oder bei Bitte beachtet: Alkoholische Produkte immer verantwortungsvoll genießen.'
  },
  {
    question: 'Ist die Farbe oder der Geschmack künstlich?',
    answer: 'TJT ist ein Naturprodukt, welches durch die hochwertige Weiterverarbeitung seine Individuelle Klasse erhält. TJT Genie ihr ohne künstliche Geschmacksverstärker oder Farbstoffe.'
  }
]

const swiperOptions = {
  modules: [Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 32,
  pagination: {
    clickable: true,
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
}

const wooCommerce = useWooCommerce()
const klassikerProductIds = [202, 205, 208]
const klassikerProducts = ref<WooProduct[]>([])
const klassikerLoading = ref(true)
const klassikerError = ref<string | null>(null)

const isAgeVerified = ref(false)

const handleVerified = () => {
  isAgeVerified.value = true
}

onMounted(() => {
  // Sync with localStorage on mount
  if (typeof window !== 'undefined') {
    const verified = localStorage.getItem('age-verified')
    isAgeVerified.value = verified === 'true'
  }
})

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

function formatPrice(price: string | number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(Number(price))
}
</script>

<style>
.recipes-slider {
  padding-bottom: 60px;
}

.swiper-pagination-bullet {
  background-color: rgba(255, 255, 255, 0.5);
}

.swiper-pagination-bullet-active {
  background-color: white;
}

.swiper-button-prev,
.swiper-button-next {
  width: 48px !important;
  height: 48px !important;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  transition: background-color 0.3s;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 18px !important;
  color: white;
}

.swiper-button-prev {
  left: 0;
}

.swiper-button-next {
  right: 0;
}

.swiper-pagination {
  bottom: -40px !important;
}

.recipes-slider .swiper-slide {
  height: auto;
  display: flex;
}

.recipes-slider .swiper-slide > div {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Particles effect */
#particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  pointer-events: none;
}

#particles::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, white 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.1;
}
</style> 
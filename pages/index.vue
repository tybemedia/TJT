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
        <section class="py-24">
          <div class="container mx-auto px-4">
            <div class="flex items-center justify-center mb-16 gap-4 select-none">
              <div class="flex-1 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
              <h2 class="text-5xl font-bold text-white tracking-tight text-center">Rezepte</h2>
              <div class="flex-1 h-1 bg-gradient-to-l from-transparent via-white/20 to-transparent rounded-full"></div>
            </div>
            <div class="relative max-w-5xl mx-auto">
              <Swiper v-bind="swiperOptions" class="recipes-slider">
                <SwiperSlide v-for="recipe in recipes" :key="recipe.id">
                  <div class="text-center group hover:transform hover:scale-105 transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <div class="relative aspect-[3/4] mb-6 overflow-hidden rounded-xl bg-white/5 cursor-pointer" @click="openRecipe(recipe)">
                      <img 
                        :src="getRecipeImage(recipe)" 
                        :alt="decodeHtmlEntities(recipe.title.rendered)" 
                        class="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 class="text-2xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors">{{ decodeHtmlEntities(recipe.title.rendered) }}</h3>
                    <button class="text-primary-400 hover:text-primary-300 font-medium flex items-center gap-2 justify-center group-hover:translate-x-2 transition-transform" @click="openRecipe(recipe)">
                      Zum Rezept
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </SwiperSlide>
              </Swiper>
              <!-- Navigation Buttons -->
              <div class="swiper-button-prev !text-white after:!text-2xl !-left-16"></div>
              <div class="swiper-button-next !text-white after:!text-2xl !-right-16"></div>
              <!-- Pagination -->
              <div class="swiper-pagination !bottom-[-40px]"></div>
            </div>
            <!-- Recipe Popup Modal -->
            <div v-if="selectedRecipe" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg">
              <div
                @click.self="selectedRecipe = null"
                class="flex items-center justify-center w-full h-full"
                style="position: absolute; inset: 0;"
              >
                <div
                  class="relative w-full max-w-full sm:max-w-2xl md:max-w-3xl mx-0 sm:mx-4 my-0 sm:my-12 bg-[#131314] rounded-none sm:rounded-3xl shadow-2xl border border-white/20 flex flex-col animate-fade-in-modal"
                  :class="{'overflow-y-auto max-h-[90vh]': true}"
                  style="min-height: 0; max-height: 90vh;"
                >
                  <!-- Close Button -->
                  <button @click="selectedRecipe = null" class="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/30 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all group">
                    <span class="sr-only">Schließen</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <!-- Recipe Content -->
                  <div class="flex flex-col md:flex-row gap-0 md:gap-10 p-3 xs:p-4 sm:p-6 md:p-10">
                    <div class="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center mb-4 md:mb-0">
                      <img :src="getRecipeImage(selectedRecipe)" :alt="decodeHtmlEntities(selectedRecipe.title.rendered)" class="w-full h-40 xs:h-48 sm:h-64 md:h-80 object-cover rounded-xl shadow-lg border border-white/10" />
                    </div>
                    <div class="flex-1 flex flex-col justify-center">
                      <h2 class="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 text-white leading-tight drop-shadow-lg">{{ decodeHtmlEntities(selectedRecipe.title.rendered) }}</h2>
                      <div class="prose prose-invert max-w-none text-white/90 text-sm xs:text-base sm:text-lg leading-relaxed" v-html="selectedRecipe.content.rendered"></div>
                    </div>
                  </div>
                  <!-- Single Small Divider -->
                  <div class="flex justify-center my-2">
                    <div class="h-1 w-10 sm:w-16 bg-white/20 rounded-full"></div>
                  </div>
                  <!-- Product Section -->
                  <div class="bg-[#131314] border-t border-white/20 px-2 py-4 xs:px-3 xs:py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 rounded-b-none sm:rounded-b-3xl shadow-inner">
                    <h3 class="text-lg xs:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 text-center tracking-tight">Perfekt für jedes Rezept</h3>
                    <div v-if="klassikerLoading" class="text-center text-white text-base py-2 sm:py-4">Produkte werden geladen...</div>
                    <div v-else-if="klassikerError" class="text-center text-red-500 text-base py-2 sm:py-4">{{ klassikerError }}</div>
                    <div v-else class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 max-w-3xl mx-auto">
                      <NuxtLink
                        v-for="product in klassikerProducts"
                        :key="product.id"
                        :to="`/product?id=${product.id}`"
                        class="group flex flex-col items-center bg-white/10 hover:bg-primary-900/30 transition-all duration-300 rounded-xl p-2 sm:p-4 focus:outline-none focus:ring-2 focus:ring-primary-500 border border-white/10 shadow-md"
                        tabindex="0"
                      >
                        <div class="relative aspect-[3/4] w-16 xs:w-20 sm:w-24 md:w-28 mb-2 sm:mb-3 overflow-hidden rounded-lg bg-white/10">
                          <img 
                            :src="product.images[0]?.src || ''" 
                            :alt="product.images[0]?.alt || product.name" 
                            class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h4 class="text-sm xs:text-base font-semibold text-white text-center mb-1 group-hover:text-primary-400 transition-colors">{{ product.name }}</h4>
                        <p class="text-white/60 text-xs xs:text-sm text-center">{{ formatPrice(product.price) }}</p>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- About Section -->
        <AboutTimeline />
        <InstagramFeed />
        <section class="py-20">
          <div class="container mx-auto px-4">
            <div class="flex items-center justify-center mb-16 gap-4 select-none">
              <div class="flex-1 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
              <h2 class="text-5xl font-bold text-white tracking-tight text-center">Häufige Fragen</h2>
              <div class="flex-1 h-1 bg-gradient-to-l from-transparent via-white/20 to-transparent rounded-full"></div>
            </div>
            <div class="max-w-5xl mx-auto space-y-4">
              <div v-for="(faq, index) in faqs" :key="faq.question" 
                   class="bg-white/5 rounded-xl border border-white/10 overflow-hidden transition-all duration-300"
                   :class="{ 'bg-white/10': openFaq === index }">
                <button 
                  @click="openFaq = openFaq === index ? null : index"
                  class="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none rounded-xl"
                >
                  <h3 class="text-xl font-semibold text-white">{{ faq.question }}</h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-6 w-6 text-white/60 transition-transform duration-300"
                    :class="{ 'rotate-180': openFaq === index }"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  v-show="openFaq === index"
                  class="px-8 pb-6 text-white/80 text-lg leading-relaxed animate-fade-in"
                >
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Contact Form Section -->
        <section class="relative py-24">
          <!-- Background Image -->
          <div class="absolute inset-0 z-0">
            <img 
              src="https://thejoshuatea.de/wp-content/uploads/2024/12/J68A8494.jpg" 
              alt="Contact Background" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/70"></div>
          </div>
          
          <div class="container mx-auto px-4 relative z-10">
            <div class="flex items-center justify-center mb-16 gap-4 select-none">
              <div class="flex-1 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
              <h2 class="text-5xl font-bold text-white tracking-tight text-center">Kontakt</h2>
              <div class="flex-1 h-1 bg-gradient-to-l from-transparent via-white/20 to-transparent rounded-full"></div>
            </div>
            
            <div class="max-w-2xl mx-auto">
              <form @submit.prevent="submitContactForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-white/80 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      v-model="contactForm.name"
                      required
                      class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label for="email" class="block text-white/80 mb-2">E-Mail</label>
                    <input 
                      type="email" 
                      id="email" 
                      v-model="contactForm.email"
                      required
                      class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10"
                      placeholder="Ihre E-Mail"
                    />
                  </div>
                </div>
                <div>
                  <label for="subject" class="block text-white/80 mb-2">Betreff</label>
                  <input 
                    type="text" 
                    id="subject" 
                    v-model="contactForm.subject"
                    required
                    class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10"
                    placeholder="Betreff"
                  />
                </div>
                <div>
                  <label for="message" class="block text-white/80 mb-2">Nachricht</label>
                  <textarea 
                    id="message" 
                    v-model="contactForm.message"
                    required
                    rows="6"
                    class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10 resize-none"
                    placeholder="Ihre Nachricht"
                  ></textarea>
                </div>
                <div class="flex justify-center">
                  <button 
                    type="submit"
                    :disabled="isSubmitting"
                    class="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span v-if="isSubmitting">Wird gesendet...</span>
                    <span v-else>Nachricht senden</span>
                    <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
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
import AboutTimeline from '~/components/AboutTimeline.vue'

definePageMeta({
  layout: 'default'
})

// --- Dynamic Recipes from WordPress ---
const recipes = ref<any[]>([])
const selectedRecipe = ref<any | null>(null)

function getRecipeImage(recipe: any) {
  return recipe._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'
}

function openRecipe(recipe: any) {
  selectedRecipe.value = recipe
}

onMounted(async () => {
  try {
    // Fetch only posts from the 'Cocktails' category (ID 24)
    const res = await fetch('https://thejoshuatea.de/wp-json/wp/v2/posts?categories=24&_embed')
    recipes.value = await res.json()
  } catch (e) {
    recipes.value = []
  }
})
// --- End Dynamic Recipes ---

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

const openFaq = ref<number | null>(null)

const swiperOptions = {
  modules: [Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 48,
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
      spaceBetween: 48,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 48,
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

// Utility to decode HTML entities
function decodeHtmlEntities(str: string) {
  if (!str) return ''
  const txt = document.createElement('textarea')
  txt.innerHTML = str
  return txt.value
}

// Responsive modal scroll logic
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      windowWidth.value = window.innerWidth
    })
  }
})

// Contact Form
const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

async function submitContactForm() {
  isSubmitting.value = true
  try {
    const response = await fetch('https://thejoshuatea.de/wp-json/contact-form-7/v1/contact-forms/123/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: contactForm.value.name,
        email: contactForm.value.email,
        subject: contactForm.value.subject,
        message: contactForm.value.message,
      }),
    })

    const data = await response.json()
    
    if (data.status === 'mail_sent') {
      // Reset form
      contactForm.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      // Show success message
      alert('Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.')
    } else {
      throw new Error(data.message || 'Ein Fehler ist aufgetreten')
    }
  } catch (error) {
    alert('Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.')
    console.error('Contact form error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style>
.recipes-slider {
  padding-bottom: 60px;
}

.prose :where(img) {
  margin: 1.5rem 0;
  border-radius: 1rem;
  box-shadow: 0 4px 24px 0 #0004;
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
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

.animate-fade-in-modal {
  animation: fadeInModal 0.35s cubic-bezier(.4,0,.2,1);
}
@keyframes fadeInModal {
  from { opacity: 0; transform: translateY(40px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style> 
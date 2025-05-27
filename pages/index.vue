<template>
  <div class="min-h-screen">
    <HeroSection />
    
    <!-- Products Section -->
    <section class="py-24 bg-[#131314]">
      <div class="container mx-auto px-4">
        <h2 class="text-5xl font-bold text-center mb-16 text-white tracking-tight">Produkte</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div class="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div class="relative aspect-[3/4] mb-6 overflow-hidden rounded-xl">
              <img 
                src="https://thejoshuatea.de/wp-content/uploads/2024/01/tjt-bottle-1.png" 
                alt="TJT Bottle" 
                class="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 class="text-2xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors">TJT 22% Vol. | 700ml</h3>
            <p class="text-white/60 text-lg">26,90 €</p>
          </div>
          <div class="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div class="relative aspect-[3/4] mb-6 overflow-hidden rounded-xl">
              <img 
                src="https://thejoshuatea.de/wp-content/uploads/2024/01/anbar-gin-bottle-1.png" 
                alt="Anbar Gin Bottle" 
                class="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 class="text-2xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors">Anbar Gin 45% Vol. | 700ml</h3>
            <p class="text-white/60 text-lg">28,90 €</p>
          </div>
          <div class="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div class="relative aspect-[3/4] mb-6 overflow-hidden rounded-xl">
              <img 
                src="https://thejoshuatea.de/wp-content/uploads/2024/01/tjt-bundle-1.png" 
                alt="TJT Bundle" 
                class="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 class="text-2xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors">TJT + Anbar Bundle</h3>
            <p class="text-white/60 text-lg">52,00 €</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recipes Section -->
    <section class="py-24 bg-[#131314] border-t border-white/10">
      <div class="container mx-auto px-4">
        <h2 class="text-5xl font-bold text-center mb-16 text-white tracking-tight">Rezepte</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div v-for="(recipe, index) in recipes" :key="recipe.name" 
               class="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all duration-300 group">
            <div class="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg">
              <img 
                :src="recipeImages[index]" 
                :alt="recipe.name" 
                class="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 class="text-2xl font-semibold mb-4 text-white group-hover:text-primary-400 transition-colors">{{ recipe.name }}</h3>
            <button class="text-primary-400 hover:text-primary-300 font-medium flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Zum Rezept
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-24 bg-[#131314] border-t border-white/10">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-5xl font-bold mb-8 text-white tracking-tight">The Joshua Tea – Herkunft, Inspiration und zeitlose Eleganz</h2>
            <div class="prose prose-lg prose-invert prose-headings:font-bold prose-p:text-white/80">
              <p class="mb-8 text-lg leading-relaxed">
                The Joshua Tea (TJT) ist ein einzigartiger Tea-infused Likör, der die Magie des Joshua Tree Nationalparks mit der jahrhundertealten Tradition der japanischen Teekultur und der Präzision deutscher Destillationskunst verbindet. Mit einer harmonischen Mischung aus frischer Pfirsichnote und der Tiefe von Earl Grey Tee bietet TJT ein Geschmackserlebnis, das Tradition und Innovation meisterhaft vereint.
              </p>
              <p class="mb-8 text-lg leading-relaxed">
                Die Inspiration für TJT entspringt der Mystik und Schönheit des Joshua Tree Nationalparks – einem Ort, der für Freiheit, Kreativität und unvergleichliche Natur steht. Diese Werte spiegeln sich in jeder Flasche wider und machen TJT zu einem Produkt, das mit Liebe zum Detail und höchstem Qualitätsanspruch geschaffen wurde.
              </p>
            </div>
          </div>
          <div class="relative aspect-square rounded-xl overflow-hidden">
            <img 
              src="https://thejoshuatea.de/wp-content/uploads/2024/01/joshua-tree-1.jpg" 
              alt="Joshua Tree National Park" 
              class="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 bg-[#131314] border-t border-white/10">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-5xl font-bold text-center mb-16 text-white tracking-tight">Häufige Fragen</h2>
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
    <section class="py-24 bg-[#131314] border-t border-white/10">
      <div class="container mx-auto px-4 max-w-2xl text-center">
        <div class="relative aspect-[16/9] mb-12 rounded-xl overflow-hidden">
          <img 
            src="https://thejoshuatea.de/wp-content/uploads/2024/01/cocktail-1.jpg" 
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
</template>

<script setup lang="ts">
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
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60'
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
</script> 
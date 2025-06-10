<template>
  <div class="min-h-screen bg-[#131314] text-white">
    <Navbar />
    
    <main>
      <slot />
    </main>

    <footer class="bg-[#131314] text-white py-12 border-t border-white/10">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <!-- Navigation -->
          <div>
            <h3 class="text-xl font-bold mb-6">Navigation</h3>
            <ul class="space-y-3">
              <li><NuxtLink to="/" class="text-white/80 hover:text-white transition-colors">Start</NuxtLink></li>
              <li><NuxtLink to="/shop" class="text-white/80 hover:text-white transition-colors">Shop</NuxtLink></li>
              <li><NuxtLink to="/recipes" class="text-white/80 hover:text-white transition-colors">Rezepte</NuxtLink></li>
              <li><NuxtLink to="/products" class="text-white/80 hover:text-white transition-colors">TJT</NuxtLink></li>
              <li><NuxtLink to="/anbar-gin" class="text-white/80 hover:text-white transition-colors">Anbar Gin</NuxtLink></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="md:col-span-2">
            <h3 class="text-xl font-bold mb-6">Newsletter</h3>
            <p class="text-white/80 mb-6">
              Bleiben Sie auf dem Laufenden über exklusive Angebote, Events und spannende Neuigkeiten.
            </p>
            <form class="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="E-Mail-Adresse" 
                class="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10"
              >
              <button type="submit" 
                      class="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 font-medium whitespace-nowrap">
                Abonnieren
              </button>
            </form>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="mt-12 pt-8 border-t border-white/10">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="text-white/60 text-sm">
              © {{ new Date().getFullYear() }} The Joshua Tea. Alle Rechte vorbehalten.
            </div>
            <div class="flex gap-6">
              <a href="#" class="text-white/60 hover:text-white transition-colors">Impressum</a>
              <a href="#" class="text-white/60 hover:text-white transition-colors">Datenschutz</a>
              <a href="#" class="text-white/60 hover:text-white transition-colors">AGB</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import Toast from '~/components/Toast.vue'
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
  background-color: #131314;
  color: white;
}
</style> 
<template>
  <div class="min-h-screen bg-[#131314] text-white">
    <Navbar />
    
    <main>
      <slot />
    </main>

    <footer class="bg-[#131314] text-white py-12 border-t border-white/10">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">Navigation</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-white/80 hover:text-white">Start</NuxtLink></li>
              <li><NuxtLink to="/shop" class="text-white/80 hover:text-white">Shop</NuxtLink></li>
              <li><NuxtLink to="/recipes" class="text-white/80 hover:text-white">Rezepte</NuxtLink></li>
              <li><NuxtLink to="/products" class="text-white/80 hover:text-white">TJT</NuxtLink></li>
              <li><NuxtLink to="/anbar-gin" class="text-white/80 hover:text-white">Anbar Gin</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Kontakt</h3>
            <form class="space-y-4">
              <input 
                type="text" 
                placeholder="Name" 
                class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-white/50"
              >
              <input 
                type="email" 
                placeholder="E-Mail-Adresse" 
                class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-white/50"
              >
              <textarea 
                placeholder="Nachricht" 
                class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-white/50"
                rows="4"
              ></textarea>
              <button type="submit" class="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200">
                Senden
              </button>
            </form>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Newsletter</h3>
            <p class="text-white/60 mb-4">
              Entdecke die Welt von The Joshua Tea! Trag dich in unseren Newsletter ein und bleib immer auf dem Laufenden.
            </p>
            <form class="flex gap-2">
              <input 
                type="email" 
                placeholder="E-Mail-Adresse" 
                class="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-white/50"
              >
              <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200">
                Abonnieren
              </button>
            </form>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Rechtliches</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/impressum" class="text-white/80 hover:text-white">Impressum</NuxtLink></li>
            </ul>
          </div>
        </div>
        <div class="mt-12 pt-8 border-t border-white/10 text-center text-white/60">
          © {{ new Date().getFullYear() }} The Joshua Tea
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Layout logic can be added here
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
  background-color: #131314;
  color: white;
}
</style> 
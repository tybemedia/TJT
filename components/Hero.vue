<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img 
        src="../assets/images/J68A3858 (1).jpg" 
        alt="The Joshua Tea Hero Background" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <!-- Content -->
    <div class="relative container mx-auto px-4 text-center">
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
        The Joshua Tea
      </h1>
      <p class="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
        Entdecken Sie die einzigartige Welt des Joshua Tea - eine perfekte Mischung aus Tradition und Innovation.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink 
          to="/products" 
          class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#131314] bg-white hover:bg-white/90"
        >
          Unsere Klassiker
        </NuxtLink>
        <a 
          href="/#TJT-Rezepte" 
          class="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10"
        >
          Rezepte
        </a>
      </div>
    </div>
  </div>
</template> 
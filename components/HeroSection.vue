<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Video for Desktop -->
    <div class="hidden md:block absolute inset-0 w-full h-full">
      <video 
        ref="video"
        class="w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
      >
        <source src="https://thejoshuatea.de/wp-content/uploads/2025/03/TJT.mp4" type="video/mp4">
      </video>
      <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
    </div>
    
    <!-- Background Image for Mobile -->
    <div class="md:hidden absolute inset-0 w-full h-full">
      <img 
        src="https://thejoshuatea.de/wp-content/uploads/2024/12/J68A8494.jpg" 
        alt="The Joshua Tea Hero Background Mobile" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <!-- Content -->
    <div class="relative container mx-auto px-4 flex items-center justify-center">
      <div class="max-w-2xl text-white text-center">
        <img 
          src="https://thejoshuatea.de/wp-content/uploads/2024/12/logo_cropped-1.png" 
          alt="The Joshua Tea Logo" 
          class="w-96 opacity-0 mx-auto mb-4"
          ref="logo"
        />
        <h1 class="text-8xl font-bold opacity-0 mb-8" ref="title">
          <span class="text-4xl uppercase tracking-wider">ZEITLOSE ELEGANZ</span>
        </h1>
        <div class="flex flex-col sm:flex-row gap-8 opacity-0 justify-center" ref="buttons">
          <NuxtLink to="/shop" class="px-8 py-3 text-lg font-medium bg-transparent border border-white text-white rounded-md hover:bg-white/10 transition-colors duration-200">
            UNSERE KLASSIKER
          </NuxtLink>
          <NuxtLink to="/#TJT-Rezepte" class="px-8 py-3 text-lg font-medium bg-transparent border border-white text-white rounded-md hover:bg-white/10 transition-colors duration-200">
            REZEPTE
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const video = ref<HTMLVideoElement | null>(null)
const logo = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const buttons = ref<HTMLElement | null>(null)

const animateContent = () => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  tl.to(logo.value, {
    opacity: 1,
    y: 0,
    duration: 1.5,
  })
    .to(title.value, {
      opacity: 1,
      y: 0,
      duration: 1.5,
    }, '-=0.5')
    .to(buttons.value, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, '-=0.5')
}

onMounted(() => {
  if (video.value) {
    video.value.play().catch(error => {
      console.error('Error playing video:', error)
    })
  }
  animateContent()
})
</script>

<style scoped>
video {
  filter: brightness(0.9);
}
</style> 
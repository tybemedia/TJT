<template>
  <div :class="[
    'about-block flex flex-col md:flex-row items-center gap-10 md:gap-20 transition-all duration-500',
    reverse ? 'md:flex-row-reverse' : '',
    active ? 'about-block-active' : 'opacity-60 scale-95',
  ]">
    <img :src="img" :alt="title" class="about-block-img w-full md:w-96 h-64 md:h-96 object-cover rounded-xl shadow-lg transition-all duration-500" />
    <div class="about-block-text max-w-xl">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">{{ title }}</h2>
      <p class="text-lg md:text-xl text-gray-200 leading-relaxed">{{ text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  text: String,
  img: String,
  reverse: Boolean,
  active: Boolean,
})
</script> 
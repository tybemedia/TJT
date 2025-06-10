<template>
  <section class="about-section-bg py-24 relative">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto flex flex-col gap-24">
        <AboutBlock
          v-for="(block, i) in blocks"
          :key="block.title"
          :title="block.title"
          :text="block.text"
          :img="block.img"
          :reverse="i % 2 === 1"
          :active="activeIndex === i"
          :ref="setBlockRef(i)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import AboutBlock from './AboutBlock.vue'

const blocks = [
  {
    title: 'TJT – Ein Likör wie kein anderer',
    text: 'The Joshua Tea (TJT) vereint die spirituelle Weite des Joshua Tree Nationalparks mit der Finesse japanischer Teekunst und deutscher Destillationspräzision. Fruchtiger Pfirsich trifft auf eleganten Earl Grey – für ein unverwechselbares, modernes Geschmackserlebnis mit Tiefgang.',
    img: 'https://thejoshuatea.de/wp-content/uploads/2024/12/J68A8494.jpg',
  },
  {
    title: 'Luxus für den Augenblick',
    text: 'TJT ist kein gewöhnlicher Likör – er ist ein Statement. Ob auf Eis, im Spritz oder mit Champagner: Jede Komposition lädt ein, Genuss bewusster zu zelebrieren. Handveredelt in Deutschland. Stilvoll. Besonders.',
    img: 'https://thejoshuatea.de/wp-content/uploads/2024/10/J68A7683.jpg',
  },
  {
    title: 'Eleganz, die bleibt',
    text: 'Mit The Joshua Tea erleben Sie Genuss, der über den Moment hinaus wirkt. Natürliche Zutaten, kultivierte Aromen und handwerkliche Vollendung machen TJT zum Inbegriff moderner Eleganz – für Menschen mit Sinn für das Außergewöhnliche.',
    img: 'https://thejoshuatea.de/wp-content/uploads/2024/12/TJT-Cocktails.jpg',
  },
]

const blockRefs = ref<any[]>([])
const activeIndex = ref(0)

function setBlockRef(i: number) {
  return (el: any) => {
    blockRefs.value[i] = el
  }
}

function onScroll() {
  let minDist = Infinity
  let idx = 0
  blockRefs.value.forEach((el, i) => {
    if (!el) return
    const rect = el.$el ? el.$el.getBoundingClientRect() : el.getBoundingClientRect()
    const dist = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2)
    if (dist < minDist) {
      minDist = dist
      idx = i
    }
  })
  activeIndex.value = idx
}

onMounted(() => {
  nextTick(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.about-block {
  opacity: 0.7;
  transform: scale(0.97);
  filter: blur(0.5px);
}
.about-block-active {
  opacity: 1 !important;
  transform: scale(1.04) !important;
  filter: none !important;
  z-index: 2;
}
</style> 
<template>
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-center mb-16 gap-4 select-none">
        <div class="flex-1 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
        <h2 class="text-5xl font-bold text-white tracking-tight text-center">Social Media</h2>
        <div class="flex-1 h-1 bg-gradient-to-l from-transparent via-white/20 to-transparent rounded-full"></div>
      </div>
      <div class="instagram-feed-wrapper">
        <iframe 
          src="//lightwidget.com/widgets/a49cab7a3e69500789df2ba35c8d202d.html" 
          scrolling="no" 
          allowtransparency="true" 
          class="lightwidget-widget" 
          style="width:100%;border:0;overflow:hidden;"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
// Add LightWidget script
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js'
  script.async = true
  document.head.appendChild(script)
})
</script>

<style scoped>
.instagram-feed-wrapper {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style> 
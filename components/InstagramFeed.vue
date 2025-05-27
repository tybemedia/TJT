<template>
  <section class="py-20 bg-[#131314]">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-12">Folge uns auf Instagram</h2>
      <div class="relative w-full max-w-4xl mx-auto">
        <!-- Instagram Feed Widget -->
        <div class="instagram-feed-wrapper">
          <iframe
            src="https://www.instagram.com/thejoshuatea/embed"
            frameborder="0"
            scrolling="no"
            allowtransparency="true"
            class="w-full h-[600px]"
          ></iframe>
        </div>
        
        <!-- Follow Button -->
        <div class="text-center mt-8">
          <a
            href="https://www.instagram.com/thejoshuatea/"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 font-medium"
          >
            @thejoshuatea
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No setup needed for the iframe approach
</script>

<style scoped>
.instagram-feed-wrapper {
  background: #131314;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style> 
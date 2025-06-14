<template>
  <div class="min-h-screen bg-[#131314] text-white">
    <Navbar />
    <main class="flex-1">
      <NuxtPage />
    </main>

    <footer class="relative py-12 border-t border-white/10">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://thejoshuatea.de/wp-content/uploads/2024/12/J68A8494.jpg" 
          alt="Footer Background" 
          class="w-full h-full object-cover opacity-20"
        />
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-5xl mx-auto">
          <!-- Contact Form -->
          <div id="kontakt">
            <h3 class="text-xl font-bold mb-6">Kontakt</h3>
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
                  rows="4"
                  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10 resize-none"
                  placeholder="Ihre Nachricht"
                ></textarea>
              </div>
              <div class="flex justify-end">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

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

// Initialize app
onMounted(() => {
  console.log('App mounted')
  cartStore.loadFromStorage()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  background-color: #131314;
  color: white;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Arvo", serif;
  font-weight: 700;
  font-style: normal;
}

.arvo-regular {
  font-family: "Arvo", serif;
  font-weight: 400;
  font-style: normal;
}

.arvo-bold {
  font-family: "Arvo", serif;
  font-weight: 700;
  font-style: normal;
}

.arvo-regular-italic {
  font-family: "Arvo", serif;
  font-weight: 400;
  font-style: italic;
}

.arvo-bold-italic {
  font-family: "Arvo", serif;
  font-weight: 700;
  font-style: italic;
}
</style>

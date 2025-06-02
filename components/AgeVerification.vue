<template>
  <div v-if="!isVerified" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
    <div class="w-full max-w-md p-8 mx-4 bg-[#131314] rounded-xl border border-white/10">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-4">Altersverifizierung</h2>
        <p class="text-white/80">
          Um fortzufahren, bestätigen Sie bitte, dass Sie mindestens 18 Jahre alt sind.
        </p>
      </div>

      <div class="space-y-4">
        <button
          @click="verifyAge(true)"
          class="w-full px-6 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-primary-600/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Ja, ich bin mindestens 18 Jahre alt</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <button
          @click="verifyAge(false)"
          class="w-full px-6 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-medium text-lg border border-white/20 hover:border-white/30 flex items-center justify-center gap-2"
        >
          <span>Nein, ich bin unter 18 Jahre alt</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="mt-6 text-center text-white/60 text-sm">
        <p>
          Der Konsum von Alkohol ist für Personen unter 18 Jahren gesetzlich verboten.
          <br>
          Bitte konsumieren Sie verantwortungsvoll.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const isVerified = useLocalStorage('age-verified', false)
const emit = defineEmits(['verified'])

const verifyAge = (verified: boolean) => {
  if (verified) {
    isVerified.value = true
    emit('verified')
  } else {
    window.location.href = 'https://www.bzga.de/'
  }
}

onMounted(() => {
  if (isVerified.value) {
    emit('verified')
  }
})
</script> 
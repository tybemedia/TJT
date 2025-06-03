import { ref } from 'vue'

export const useStripe = () => {
  const config = useRuntimeConfig()
  const stripe = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const initializeStripe = () => {
    if (typeof window === 'undefined') return null
    
    if (!stripe.value) {
      const Stripe = (window as any).Stripe
      if (!Stripe) {
        throw new Error('Stripe.js not loaded')
      }
      stripe.value = Stripe(config.public.stripePublicKey)
    }
    return stripe.value
  }

  const createCheckoutSession = async (productId: number, quantity: number = 1) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const session = await response.json()
      return session
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create checkout session'
      throw err
    } finally {
      loading.value = false
    }
  }

  const redirectToCheckout = async (productId: number, quantity: number = 1) => {
    try {
      const stripe = initializeStripe()
      if (!stripe) {
        throw new Error('Stripe not initialized')
      }

      const session = await createCheckoutSession(productId, quantity)
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to redirect to checkout'
      throw err
    }
  }

  return {
    loading,
    error,
    redirectToCheckout,
  }
} 
import Stripe from 'stripe'
import { useWooCommerce } from '~/composables/useWooCommerce'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2023-10-16',
  })

  try {
    const body = await readBody(event)
    const { productId, quantity } = body

    if (!productId || !quantity) {
      throw createError({
        statusCode: 400,
        message: 'Product ID and quantity are required',
      })
    }

    // Get product details from WooCommerce
    const wooCommerce = useWooCommerce()
    const product = await wooCommerce.getProduct(productId)

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product.name,
              description: product.short_description,
              images: product.images.map(img => img.src),
            },
            unit_amount: Math.round(Number(product.price) * 100), // Convert to cents
          },
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `${config.public.siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.public.siteUrl}/product?id=${productId}`,
      metadata: {
        productId,
        quantity,
      },
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to create checkout session',
    })
  }
}) 
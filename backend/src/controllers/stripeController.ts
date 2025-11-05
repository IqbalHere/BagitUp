import { Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import Stripe from 'stripe'
import Product from '../models/Product'

const USE_STRIPE = process.env.USE_STRIPE === 'true'
const stripe = process.env.STRIPE_SECRET_KEY && USE_STRIPE
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-10-29.clover' })
  : null

export const stripeController = {
  // Create checkout session
  async createCheckoutSession(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!stripe) {
        return res.status(503).json({
          message: 'Stripe is not configured or disabled. Set USE_STRIPE=true and STRIPE_SECRET_KEY.',
        })
      }

      const { productId, quantity = 1 } = req.body
      const userId = req.user?.uid

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      // Get product details
      const product = await Product.findById(productId)
      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: product.currency.toLowerCase(),
              product_data: {
                name: product.name,
                description: product.description,
                images: [product.imageUrl],
              },
              unit_amount: Math.round(product.price * 100), // Convert to cents
            },
            quantity,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CORS_ORIGIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CORS_ORIGIN}/products/${productId}`,
        metadata: {
          userId,
          productId: String(product._id),
        },
      })

      res.json({
        success: true,
        sessionId: session.id,
        url: session.url,
      })
    } catch (error) {
      next(error)
    }
  },

  // Verify checkout session
  async verifySession(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!stripe) {
        return res.status(503).json({
          message: 'Stripe is not configured',
        })
      }

      const { sessionId } = req.params

      const session = await stripe.checkout.sessions.retrieve(sessionId)

      res.json({
        success: true,
        session: {
          id: session.id,
          status: session.payment_status,
          customerEmail: session.customer_email,
          amountTotal: session.amount_total,
          currency: session.currency,
        },
      })
    } catch (error) {
      next(error)
    }
  },

  // Check if Stripe is enabled
  async getStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({
        success: true,
        stripeEnabled: USE_STRIPE,
        configured: !!stripe,
      })
    } catch (error) {
      next(error)
    }
  },
}

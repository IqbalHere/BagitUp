import { Router } from 'express'
import { authenticateToken } from '../middleware/auth'
import { stripeController } from '../controllers/stripeController'

const router = Router()

// All routes require authentication
router.use(authenticateToken)

// Create checkout session
router.post('/create-checkout-session', stripeController.createCheckoutSession)

// Verify session
router.get('/session/:sessionId', stripeController.verifySession)

// Get Stripe status
router.get('/status', stripeController.getStatus)

export default router

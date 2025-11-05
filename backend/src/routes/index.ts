import { Router } from 'express'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import itemRoutes from './itemRoutes'
import tripRoutes from './tripRoutes'
import productRoutes from './productRoutes'
import recommendationRoutes from './recommendationRoutes'
import stripeRoutes from './stripeRoutes'

const router = Router()

// Mount route modules
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/items', itemRoutes)
router.use('/trips', tripRoutes)
router.use('/products', productRoutes)
router.use('/recommendations', recommendationRoutes)
router.use('/stripe', stripeRoutes)

// API info endpoint
router.get('/', (_req, res) => {
  res.json({
    message: 'BagitUp Travel API',
    version: '2.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      items: '/api/items',
      trips: '/api/trips',
      products: '/api/products',
      recommendations: '/api/recommendations',
      stripe: '/api/stripe',
    },
  })
})

export default router

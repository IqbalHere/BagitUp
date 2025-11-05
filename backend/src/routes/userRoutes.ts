import { Router } from 'express'
import { authenticateToken } from '../middleware/auth'
import {
  getOrCreateUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController'

const router = Router()

// All routes require authentication
router.use(authenticateToken)

// User routes
router.post('/sync', getOrCreateUser) // Sync user from Firebase
router.get('/profile', getUserProfile)
router.put('/profile', updateUserProfile)

export default router

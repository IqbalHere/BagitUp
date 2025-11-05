import { Router } from 'express'
import { authenticateToken } from '../middleware/auth'
import { syncUser } from '../controllers/userController'

const router = Router()

// Sync user with backend (requires authentication)
router.post('/sync', authenticateToken, syncUser)

export default router

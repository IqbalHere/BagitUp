import { Router } from 'express'
import { recommendationController } from '../controllers/recommendationController'
import { verifyToken } from '../middleware/auth'

const router = Router()

// All routes require authentication
router.use(verifyToken)

// GET /api/recommendations/status - Check service status
router.get('/status', recommendationController.getServiceStatus)

// GET /api/recommendations - Get all user recommendations
router.get('/', recommendationController.getUserRecommendations)

// GET /api/recommendations/trip/:tripId - Get/generate recommendations for a trip
router.get('/trip/:tripId', recommendationController.getRecommendations)

// DELETE /api/recommendations/trip/:tripId - Delete recommendations to force regeneration
router.delete('/trip/:tripId', recommendationController.deleteRecommendations)

// DELETE /api/recommendations/clear-all - Clear all cached recommendations for user
router.delete('/clear-all', recommendationController.deleteAllUserRecommendations)

export default router

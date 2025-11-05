import { Router } from 'express'
import { getTripController } from '../controllers/tripController'
import { verifyToken } from '../middleware/auth'

const router = Router()

// All routes require authentication
router.use(verifyToken)

// GET /api/trips - Get all trips for user
router.get('/', getTripController.getUserTrips)

// GET /api/trips/:id - Get single trip
router.get('/:id', getTripController.getTripById)

// POST /api/trips - Create new trip
router.post('/', getTripController.createTrip)

// PUT /api/trips/:id - Update trip
router.put('/:id', getTripController.updateTrip)

// DELETE /api/trips/:id - Delete trip
router.delete('/:id', getTripController.deleteTrip)

export default router

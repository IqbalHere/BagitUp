import { Router } from 'express'
import { authenticateToken } from '../middleware/auth'
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController'

const router = Router()

// All routes require authentication
router.use(authenticateToken)

// Item routes
router.get('/', getAllItems)
router.get('/:id', getItemById)
router.post('/', createItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

export default router

import { Router } from 'express'
import { productController } from '../controllers/productController'

const router = Router()

// Public routes
router.get('/', productController.getProducts)
router.get('/categories', productController.getCategories)
router.get('/:id', productController.getProductById)

// Admin routes (add auth middleware when admin system is implemented)
router.post('/', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

export default router

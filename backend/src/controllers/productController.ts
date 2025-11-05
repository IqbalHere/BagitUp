import { Request, Response, NextFunction } from 'express'
import Product from '../models/Product'

export const productController = {
  // Get all products with optional filters
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        category,
        featured,
        search,
        minPrice,
        maxPrice,
        inStock,
        limit = 50,
        page = 1,
      } = req.query

      const query: any = {}

      // Filters
      if (category) {
        query.category = category
      }

      if (featured !== undefined) {
        query.featured = featured === 'true'
      }

      if (inStock !== undefined) {
        query.inStock = inStock === 'true'
      }

      if (minPrice || maxPrice) {
        query.price = {}
        if (minPrice) query.price.$gte = Number(minPrice)
        if (maxPrice) query.price.$lte = Number(maxPrice)
      }

      // Text search
      if (search) {
        query.$text = { $search: search as string }
      }

      const limitNum = Math.min(Number(limit), 100)
      const skip = (Number(page) - 1) * limitNum

      const [products, total] = await Promise.all([
        Product.find(query)
          .limit(limitNum)
          .skip(skip)
          .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 }),
        Product.countDocuments(query),
      ])

      res.json({
        success: true,
        count: products.length,
        total,
        page: Number(page),
        pages: Math.ceil(total / limitNum),
        products,
      })
    } catch (error) {
      next(error)
    }
  },

  // Get a single product by ID
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const product = await Product.findById(id)

      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }

      res.json({
        success: true,
        product,
      })
    } catch (error) {
      next(error)
    }
  },

  // Create a new product (admin only)
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productData = req.body

      const product = new Product(productData)
      await product.save()

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product,
      })
    } catch (error) {
      next(error)
    }
  },

  // Update a product (admin only)
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const updates = req.body

      const product = await Product.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      })

      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }

      res.json({
        success: true,
        message: 'Product updated successfully',
        product,
      })
    } catch (error) {
      next(error)
    }
  },

  // Delete a product (admin only)
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const product = await Product.findByIdAndDelete(id)

      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }

      res.json({
        success: true,
        message: 'Product deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  },

  // Get product categories
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await Product.distinct('category')

      res.json({
        success: true,
        categories,
      })
    } catch (error) {
      next(error)
    }
  },
}

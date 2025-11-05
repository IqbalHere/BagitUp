import { Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import Trip from '../models/Trip'
import Product from '../models/Product'
import Recommendation from '../models/Recommendation'
import { RecommendationService } from '../services/recommendationService'

export const recommendationController = {
  // Get or generate recommendations for a trip
  async getRecommendations(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { tripId } = req.params
      const userId = req.user?.uid

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      // Check service availability
      const { gemini, redis } = RecommendationService.isAvailable()
      if (!gemini) {
        return res.status(503).json({
          message: 'AI recommendation service is not available. Please configure GEMINI_API_KEY.',
        })
      }

      // Find the trip
      const trip = await Trip.findOne({ _id: tripId, userId })
      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' })
      }

      // Check if we already have recommendations
      const existingRec = await Recommendation.findOne({ tripId, userId })
        .populate('products.productId')

      if (existingRec && existingRec.expiresAt && existingRec.expiresAt > new Date()) {
        return res.json({
          success: true,
          fromCache: true,
          recommendation: existingRec,
          message: 'Using cached recommendations',
        })
      }

      // Generate new recommendations
      const tripDetails = {
        destination: trip.destination,
        duration: trip.duration,
        startDate: trip.startDate,
        climate: trip.preferences?.climate,
        activities: trip.preferences?.activities,
        budget: trip.preferences?.budget,
        travelStyle: trip.preferences?.travelStyle,
      }

      const { recommendations, cacheKey, fromCache } = await RecommendationService.getTripRecommendations(tripDetails)

      // Parse the AI response
      const parsedItems = RecommendationService.parseRecommendations(recommendations)

      // Match items with products in database
      const matchedProducts = await Promise.all(
        parsedItems.map(async (item) => {
          // Try to find a matching product
          const product = await Product.findOne({
            $or: [
              { name: new RegExp(item.name, 'i') },
              { tags: new RegExp(item.name, 'i') },
              { category: item.category },
            ],
            inStock: true,
          }).limit(1)

          if (product) {
            return {
              productId: product._id,
              reason: item.reason,
              priority: item.priority as 'essential' | 'recommended' | 'optional',
            }
          }
          return null
        })
      )

      // Filter out nulls
      const validProducts = matchedProducts.filter((p) => p !== null)

      // Ensure recommendations is always a string for MongoDB storage
      const recommendationsString = typeof recommendations === 'string' 
        ? recommendations 
        : JSON.stringify(recommendations)

      // Create or update recommendation
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 7) // 7 days expiry

      let recommendation
      if (existingRec) {
        recommendation = await Recommendation.findByIdAndUpdate(
          existingRec._id,
          {
            products: validProducts,
            aiPrompt: JSON.stringify(tripDetails),
            aiResponse: recommendationsString,
            cacheKey,
            expiresAt,
          },
          { new: true }
        ).populate('products.productId')
      } else {
        recommendation = new Recommendation({
          tripId,
          userId,
          products: validProducts,
          aiPrompt: JSON.stringify(tripDetails),
          aiResponse: recommendationsString,
          cacheKey,
          expiresAt,
        })
        await recommendation.save()
        await recommendation.populate('products.productId')

        // Update trip with recommendation reference
        trip.recommendations = trip.recommendations || []
        trip.recommendations.push(recommendation._id as any)
        await trip.save()
      }

      res.json({
        success: true,
        fromCache,
        redisAvailable: redis,
        recommendation,
        unmatchedItems: parsedItems.filter((_, i) => matchedProducts[i] === null),
        message: fromCache ? 'Generated from cached AI response' : 'Generated new AI recommendations',
      })
    } catch (error) {
      next(error)
    }
  },

  // Get all recommendations for a user
  async getUserRecommendations(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.uid

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      const recommendations = await Recommendation.find({ userId })
        .populate('tripId')
        .populate('products.productId')
        .sort({ createdAt: -1 })

      res.json({
        success: true,
        count: recommendations.length,
        recommendations,
      })
    } catch (error) {
      next(error)
    }
  },

  // Check service status
  async getServiceStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { gemini, redis } = RecommendationService.isAvailable()

      res.json({
        success: true,
        services: {
          gemini: {
            available: gemini,
            status: gemini ? 'configured' : 'not configured',
          },
          redis: {
            available: redis,
            status: redis ? 'configured' : 'not configured',
          },
        },
      })
    } catch (error) {
      next(error)
    }
  },

  // Delete recommendations for a trip (force regeneration)
  async deleteRecommendations(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { tripId } = req.params
      const userId = req.user?.uid

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      // Verify trip ownership
      const trip = await Trip.findOne({ _id: tripId, userId })
      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' })
      }

      // Delete all recommendations for this trip
      const result = await Recommendation.deleteMany({ tripId, userId })

      // Clear trip's recommendation references
      trip.recommendations = []
      await trip.save()

      res.json({
        success: true,
        message: 'Recommendations deleted. Generate new ones with updated AI.',
        deletedCount: result.deletedCount,
      })
    } catch (error) {
      next(error)
    }
  },
}

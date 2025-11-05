import { Request, Response, NextFunction } from 'express'
import Trip from '../models/Trip'
import { AuthRequest } from '../middleware/auth'

export const getTripController = {
  // Get all trips for the authenticated user
  async getUserTrips(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.uid

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      const trips = await Trip.find({ userId })
        .populate('recommendations')
        .sort({ createdAt: -1 })

      res.json({
        success: true,
        count: trips.length,
        trips,
      })
    } catch (error) {
      next(error)
    }
  },

  // Get a single trip by ID
  async getTripById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const userId = req.user?.uid

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      const trip = await Trip.findOne({ _id: id, userId })
        .populate('recommendations')

      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' })
      }

      res.json({
        success: true,
        trip,
      })
    } catch (error) {
      next(error)
    }
  },

  // Create a new trip
  async createTrip(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.uid

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      const { destination, startDate, endDate, preferences, notes } = req.body

      // Calculate duration
      const start = new Date(startDate)
      const end = new Date(endDate)
      const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

      const trip = new Trip({
        userId,
        destination,
        startDate: start,
        endDate: end,
        duration,
        preferences,
        notes,
      })

      await trip.save()

      res.status(201).json({
        success: true,
        message: 'Trip created successfully',
        trip,
      })
    } catch (error) {
      next(error)
    }
  },

  // Update a trip
  async updateTrip(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const userId = req.user?.uid

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      const updates = req.body

      // Recalculate duration if dates changed
      if (updates.startDate && updates.endDate) {
        const start = new Date(updates.startDate)
        const end = new Date(updates.endDate)
        updates.duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      }

      const trip = await Trip.findOneAndUpdate(
        { _id: id, userId },
        updates,
        { new: true, runValidators: true }
      )

      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' })
      }

      res.json({
        success: true,
        message: 'Trip updated successfully',
        trip,
      })
    } catch (error) {
      next(error)
    }
  },

  // Delete a trip
  async deleteTrip(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const userId = req.user?.uid

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      const trip = await Trip.findOneAndDelete({ _id: id, userId })

      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' })
      }

      res.json({
        success: true,
        message: 'Trip deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  },
}

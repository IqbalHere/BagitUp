import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import Item from '../models/Item'
import User from '../models/User'

export const getAllItems = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const user = await User.findOne({ firebaseUid: req.user.uid })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const { category, status = 'active', page = 1, limit = 10 } = req.query

    const query: any = { userId: user._id, status }
    if (category) query.category = category

    const items = await Item.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await Item.countDocuments(query)

    res.json({
      items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error('Get items error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getItemById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const user = await User.findOne({ firebaseUid: req.user.uid })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const item = await Item.findOne({ _id: req.params.id, userId: user._id })

    if (!item) {
      res.status(404).json({ message: 'Item not found' })
      return
    }

    res.json(item)
  } catch (error) {
    console.error('Get item error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const createItem = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const user = await User.findOne({ firebaseUid: req.user.uid })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const { title, description, category, imageUrl, tags } = req.body

    const item = await Item.create({
      title,
      description,
      category,
      imageUrl,
      tags: tags || [],
      userId: user._id,
    })

    res.status(201).json(item)
  } catch (error) {
    console.error('Create item error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateItem = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const user = await User.findOne({ firebaseUid: req.user.uid })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const { title, description, category, imageUrl, tags, status } = req.body

    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: user._id },
      { title, description, category, imageUrl, tags, status },
      { new: true, runValidators: true }
    )

    if (!item) {
      res.status(404).json({ message: 'Item not found' })
      return
    }

    res.json(item)
  } catch (error) {
    console.error('Update item error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteItem = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const user = await User.findOne({ firebaseUid: req.user.uid })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: user._id },
      { status: 'deleted' },
      { new: true }
    )

    if (!item) {
      res.status(404).json({ message: 'Item not found' })
      return
    }

    res.json({ message: 'Item deleted successfully', item })
  } catch (error) {
    console.error('Delete item error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

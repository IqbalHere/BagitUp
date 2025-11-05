import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import User from '../models/User'

export const syncUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const { uid, email, displayName, photoURL } = req.body

    // Verify the uid matches the authenticated user
    if (uid !== req.user.uid) {
      res.status(403).json({ message: 'Forbidden: UID mismatch' })
      return
    }

    // Find or create user
    let user = await User.findOne({ firebaseUid: uid })

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        email: email || req.user.email || '',
        displayName: displayName || req.user.name,
        photoURL: photoURL || req.user.picture,
      })
    } else {
      // Update existing user
      user.email = email || user.email
      user.displayName = displayName || user.displayName
      user.photoURL = photoURL || user.photoURL
      await user.save()
    }

    res.json({ success: true, user })
  } catch (error) {
    console.error('Sync user error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getOrCreateUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const { uid, email, name, picture } = req.user

    // Find or create user
    let user = await User.findOne({ firebaseUid: uid })

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        email: email || '',
        displayName: name,
        photoURL: picture,
      })
    }

    res.json(user)
  } catch (error) {
    console.error('Get/Create user error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getUserProfile = async (
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

    res.json(user)
  } catch (error) {
    console.error('Get user profile error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateUserProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const { displayName, photoURL } = req.body

    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { displayName, photoURL },
      { new: true, runValidators: true }
    )

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.json(user)
  } catch (error) {
    console.error('Update user profile error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

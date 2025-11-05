import { Request, Response, NextFunction } from 'express'
import admin, { firebaseInitialized } from '../config/firebase'

export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Development mode bypass
    const isDev = process.env.NODE_ENV === 'development'
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    // Handle mock token from frontend development mode
    if (isDev && token === 'mock-token-dev') {
      console.log('🔧 Development mode: Using mock authentication')
      req.user = {
        uid: 'dev-user-123',
        email: 'dev@bagitup.com',
      } as admin.auth.DecodedIdToken
      next()
      return
    }

    // Development mode bypass (when no token provided)
    if (isDev && !token) {
      console.log('⚠️  Development mode: No token provided, using mock user')
      req.user = {
        uid: 'dev-user-123',
        email: 'dev@bagitup.com',
      } as admin.auth.DecodedIdToken
      next()
      return
    }

    // Check if Firebase is initialized
    if (!firebaseInitialized) {
      res.status(503).json({ 
        message: 'Authentication service not configured. Please set up Firebase credentials.' 
      })
      return
    }

    if (!token) {
      res.status(401).json({ message: 'Authentication token required' })
      return
    }

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token)
    req.user = decodedToken
    next()
  } catch (error) {
    console.error('Authentication error:', error)
    res.status(403).json({ message: 'Invalid or expired token' })
  }
}

// Export alias for compatibility
export const verifyToken = authenticateToken

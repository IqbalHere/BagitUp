'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
  User,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth, firebaseEnabled } from '../firebase/config'
import axios from 'axios'

interface AuthContextType {
  user: User | null
  loading: boolean
  token: string | null
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  getAuthToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  token: null,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signOut: async () => {},
  getAuthToken: async () => null,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  // Sync user with backend
  const syncUserWithBackend = async (firebaseUser: User) => {
    try {
      const idToken = await firebaseUser.getIdToken()
      setToken(idToken)
      
      // Backend sync disabled - no backend running
      // TODO: Enable when backend is available
      /*
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/sync`,
        {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      )
      */
    } catch (error) {
      console.error('Error syncing user with backend:', error)
    }
  }

  useEffect(() => {
    // If Firebase is disabled or auth is not initialized (development mode), use mock auth
    if (!firebaseEnabled || !auth) {
      console.log('🔧 Running without Firebase authentication - Mock auth enabled')
      
      // Check if there's a mock user in localStorage
      const mockUserData = localStorage.getItem('mockUser')
      if (mockUserData) {
        const mockUser = JSON.parse(mockUserData)
        setUser(mockUser as any)
        setToken('mock-token-dev')
      }
      
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        await syncUserWithBackend(user)
      } else {
        setToken(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    if (!firebaseEnabled || !auth) {
      throw new Error('Firebase authentication is not available in development mode')
    }
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    if (!firebaseEnabled || !auth) {
      // Mock authentication for development
      console.log('🔧 Mock sign in:', email)
      const mockUser = {
        uid: 'dev-user-123',
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
      }
      localStorage.setItem('mockUser', JSON.stringify(mockUser))
      setUser(mockUser as any)
      setToken('mock-token-dev')
      return
    }
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Error signing in with email:', error)
      throw error
    }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    if (!firebaseEnabled || !auth) {
      // Mock authentication for development
      console.log('🔧 Mock sign up:', email)
      const mockUser = {
        uid: 'dev-user-123',
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
      }
      localStorage.setItem('mockUser', JSON.stringify(mockUser))
      setUser(mockUser as any)
      setToken('mock-token-dev')
      return
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Error signing up with email:', error)
      throw error
    }
  }

  const signOut = async () => {
    if (!firebaseEnabled || !auth) {
      // Mock sign out for development
      console.log('🔧 Mock sign out')
      localStorage.removeItem('mockUser')
      setUser(null)
      setToken(null)
      return
    }
    try {
      await firebaseSignOut(auth)
      setToken(null)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const getAuthToken = async (): Promise<string | null> => {
    if (!firebaseEnabled || !auth) {
      // Return mock token for development
      return 'mock-token-dev'
    }
    if (user) {
      try {
        const idToken = await user.getIdToken()
        setToken(idToken)
        return idToken
      } catch (error) {
        console.error('Error getting auth token:', error)
        return null
      }
    }
    return null
  }

  const value = {
    user,
    loading,
    token,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    getAuthToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase/config'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
      router.push('/trip')
    } catch (err: any) {
      // Firebase error handling
      let errorMessage = 'Authentication failed'
      
      if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address'
      } else if (err.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled'
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email'
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password'
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use'
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters'
      } else if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password'
      } else if (err.code === 'auth/configuration-not-found') {
        errorMessage = '⚠️ Firebase not configured. Please check FIREBASE_AUTH_SETUP.md'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push('/trip')
    } catch (err: any) {
      // Firebase error handling
      let errorMessage = 'Google sign-in failed'
      
      if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Popup blocked. Please allow popups for this site'
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in cancelled'
      } else if (err.code === 'auth/unauthorized-domain') {
        errorMessage = 'This domain is not authorized. Add it in Firebase Console'
      } else if (err.code === 'auth/configuration-not-found') {
        errorMessage = '⚠️ Firebase not configured. Please check FIREBASE_AUTH_SETUP.md'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Background Image with Parallax */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <Image
            src="/hero-background.jpg"
            alt="Adventure Background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/30 via-[#81C784]/30 to-[#0288D1]/30 animate-gradient" />
        
        {/* Dark Overlay for Form Readability */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-sm" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/15 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-2xl shadow-2xl relative"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg text-center leading-relaxed">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/50 text-white rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-white drop-shadow">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 md:py-3 bg-white/20 backdrop-blur-md border border-white/20 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4FC3F7] focus:bg-white/25 text-sm md:text-base"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs md:text-sm font-medium mb-2 text-white drop-shadow">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 md:py-3 bg-white/20 backdrop-blur-md border border-white/20 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4FC3F7] focus:bg-white/25 text-sm md:text-base"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-xs md:text-sm font-medium mb-2 text-white drop-shadow">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 md:py-3 bg-white/20 backdrop-blur-md border border-white/20 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4FC3F7] focus:bg-white/25 text-sm md:text-base"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#4FC3F7] to-[#0288D1] text-white py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 shadow-lg border border-white/20 text-sm md:text-base"
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-white/30"></div>
          <span className="px-4 text-white/80 text-sm font-medium">OR</span>
          <div className="flex-1 border-t border-white/30"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white/20 backdrop-blur-md border border-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/30 hover:scale-105 transition-all disabled:opacity-50 shadow-lg text-sm md:text-base"
        >
          {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
        </button>

        <p className="mt-4 md:mt-6 text-center text-xs md:text-sm text-white/90 drop-shadow leading-relaxed">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            className="text-[#4FC3F7] font-bold hover:underline underline-offset-2"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </main>
  )
}

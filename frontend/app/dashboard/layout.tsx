'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/context/AuthContext'
import { useTrip } from '@/lib/context/TripContext'
import { auth } from '@/lib/firebase/config'
import { signOut } from 'firebase/auth'
import { motion } from 'framer-motion'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const { trip, hasTrip } = useTrip()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && !user && mounted) {
      router.push('/auth')
    } else if (!loading && user && !hasTrip && mounted) {
      router.push('/trip')
    }
  }, [user, loading, hasTrip, mounted, router])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const tabs = [
    { name: 'About the Place', path: '/dashboard/about', icon: '' },
    { name: 'Travel Planner', path: '/dashboard/planner', icon: '' },
    { name: 'Bookings', path: '/dashboard/bookings', icon: '' },
    { name: 'Gear', path: '/dashboard/gear', icon: '' },
  ]

  if (loading || !mounted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-tealgreen text-xl">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (!hasTrip) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-tealgreen">BagItUp</h1>
          {trip && (
            <div className="hidden md:block text-sm text-gray-600">
              Trip to <span className="font-semibold text-tealgreen">{trip.destination}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/trip')}
            className="px-3 py-2 text-sm text-coolseablue hover:text-tealgreen transition-colors"
          >
            Edit Trip
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-coolseablue text-white rounded-lg hover:opacity-90 transition-opacity text-sm md:text-base"
          >
            Sign Out
          </button>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200 px-6 py-3 overflow-x-auto">
        <div className="flex space-x-2 md:space-x-6 min-w-max">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              href={tab.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                pathname === tab.path
                  ? 'bg-tealgreen text-white'
                  : 'text-gray-700 hover:bg-lightblue hover:text-tealgreen'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="font-medium">{tab.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-auto p-6"
      >
        {children}
      </motion.main>
    </div>
  )
}

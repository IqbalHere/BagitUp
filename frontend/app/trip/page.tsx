'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import { useTrip } from '@/lib/context/TripContext'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function TripPage() {
  const { user, loading: authLoading } = useAuth()
  const { setTrip, trip } = useTrip()
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  
  const [destination, setDestination] = useState(trip?.destination || '')
  const [startDate, setStartDate] = useState(trip?.startDate || '')
  const [endDate, setEndDate] = useState(trip?.endDate || '')
  const [groupType, setGroupType] = useState<'solo' | 'couple' | 'family' | 'friends' | 'business'>(
    trip?.groupType || 'solo'
  )
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth')
    }
  }, [authLoading, user, router])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!destination.trim()) {
      setError('Please enter a destination')
      return
    }
    if (!startDate) {
      setError('Please select a start date')
      return
    }
    if (!endDate) {
      setError('Please select an end date')
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (start < today) {
      setError('Start date cannot be in the past')
      return
    }
    if (end < start) {
      setError('End date must be after start date')
      return
    }

    // Save trip data
    setTrip({
      destination: destination.trim(),
      startDate,
      endDate,
      groupType,
    })

    // Redirect to loading page
    router.push('/loading-trip')
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-tealgreen text-xl">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const groupTypes = [
    { value: 'solo', label: 'Solo Travel', icon: '🧳' },
    { value: 'couple', label: 'Couple', icon: '💑' },
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { value: 'friends', label: 'Friends', icon: '👥' },
    { value: 'business', label: 'Business', icon: '💼' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12">
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/25 via-[#81C784]/25 to-[#0288D1]/25 animate-gradient" />
        
        {/* Light Overlay for Readability */}
        <div className="absolute inset-0 bg-white/8 backdrop-blur-[1px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8 lg:p-12">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-black drop-shadow-lg mb-2 text-center leading-relaxed"
          >
            Plan Your Trip
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-black drop-shadow text-center mb-6 md:mb-8 font-medium text-sm md:text-base leading-relaxed"
          >
            Tell us about your journey and we&apos;ll create a personalized plan
          </motion.p>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/20 backdrop-blur-sm border border-red-400/50 text-black px-4 py-3 rounded-lg mb-6 text-center shadow-lg"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="destination" className="block text-xs md:text-sm font-medium text-black drop-shadow mb-2">
                Where are you going? <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Paris, Tokyo, New York"
                className="w-full px-4 py-2 md:py-3 bg-white/20 backdrop-blur-md border border-white/20 text-black placeholder-black/50 rounded-lg focus:ring-2 focus:ring-[#4FC3F7] focus:bg-white/25 outline-none transition-all text-sm md:text-base"
              />
            </motion.div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="startDate" className="block text-xs md:text-sm font-medium text-black drop-shadow mb-2">
                  Start Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 md:py-3 bg-white/20 backdrop-blur-md border border-white/20 text-black rounded-lg focus:ring-2 focus:ring-[#4FC3F7] focus:bg-white/25 outline-none transition-all [color-scheme:light] text-sm md:text-base"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="endDate" className="block text-xs md:text-sm font-medium text-black drop-shadow mb-2">
                  End Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 md:py-3 bg-white/20 backdrop-blur-md border border-white/20 text-black rounded-lg focus:ring-2 focus:ring-[#4FC3F7] focus:bg-white/25 outline-none transition-all [color-scheme:light] text-sm md:text-base"
                />
              </motion.div>
            </div>

            {/* Group Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-xs md:text-sm font-medium text-black drop-shadow mb-3">
                Who&apos;s traveling? <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
                {groupTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setGroupType(type.value as any)}
                    className={`p-3 md:p-4 rounded-lg border-2 transition-all text-center backdrop-blur-md ${
                      groupType === type.value
                        ? 'border-[#4FC3F7] bg-[#4FC3F7]/30 text-black shadow-lg scale-105'
                        : 'border-white/20 bg-white/10 hover:bg-white/20 hover:border-[#81C784] text-black'
                    }`}
                  >
                    <div className="text-xl md:text-2xl mb-1">{type.icon}</div>
                    <div className="text-[10px] md:text-xs font-medium leading-tight">{type.label}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              type="submit"
              className="w-full bg-gradient-to-r from-[#4FC3F7] to-[#0288D1] text-white py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:shadow-xl hover:scale-105 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4FC3F7] border border-white/20"
            >
              Start Planning →
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTrip } from '@/lib/context/TripContext'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function LoadingTripPage() {
  const { trip } = useTrip()
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!trip) {
      router.push('/trip')
      return
    }

    // Redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard/about')
    }, 3000)

    return () => clearTimeout(timer)
  }, [trip, router])

  if (!trip) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
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
        
        {/* Light Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md w-full bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 md:p-12"
      >
        {/* Animated Icon */}
        <motion.div
          className="mb-8 flex justify-center"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-6xl md:text-8xl drop-shadow-lg">✈️</div>
        </motion.div>

        {/* Loading Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-3xl font-bold text-white drop-shadow-lg mb-4 leading-relaxed"
        >
          Planning your trip to {trip.destination}...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/80 text-sm md:text-lg mb-8 drop-shadow leading-relaxed"
        >
          We&apos;re creating a personalized itinerary just for you
        </motion.p>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-[#4FC3F7] to-[#0288D1] rounded-full shadow-lg"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

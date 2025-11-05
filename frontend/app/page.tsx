'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (!loading && user) {
      router.push('/trip')
    }
  }, [user, loading, router])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      title: 'AI-Powered Itineraries',
      description: 'Personalized day-by-day plans with GPT-4o',
      icon: '🤖',
    },
    {
      title: 'Smart Packing Lists',
      description: 'Gear recommendations for your destination',
      icon: '🎒',
    },
    {
      title: 'Local Intelligence',
      description: 'Etiquette, safety, and insider tips',
      icon: '🌍',
    },
    {
      title: 'Best Deals',
      description: 'Hotels, flights, and gear in one place',
      icon: '💰',
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-tealgreen text-xl">Loading...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
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
        <div className="absolute inset-0 bg-white/12 backdrop-blur-[2px]" />
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 md:px-6 py-16 md:py-24 text-center max-w-4xl"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg leading-tight">
            Plan Your Perfect Trip
          </h1>
          <p className="text-lg md:text-xl text-white/95 drop-shadow-md mb-8 max-w-2xl mx-auto font-medium">
            AI-powered itineraries, smart packing lists, and local insights—all in one beautiful app.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/auth"
            className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#4FC3F7] to-[#0288D1] text-white text-base md:text-lg font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all shadow-lg border border-white/20"
          >
            Get Started Free
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-6xl relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white/15 backdrop-blur-xl border border-white/20 p-4 md:p-6 lg:p-8 rounded-xl text-center hover:bg-white/20 hover:scale-105 transition-all shadow-lg"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-3 lg:mb-4">{feature.icon}</div>
              <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-1 md:mb-2 lg:mb-3 text-white drop-shadow-md leading-relaxed">
                {feature.title}
              </h2>
              <p className="text-xs md:text-sm lg:text-base text-white/80 drop-shadow-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-20 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-white/15 backdrop-blur-xl border border-white/20 p-6 md:p-8 lg:p-12 rounded-2xl shadow-2xl"
        >
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-3 md:mb-4 lg:mb-6 text-white drop-shadow-lg leading-relaxed">
            Ready to Start Planning?
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-white/80 drop-shadow-md mb-4 md:mb-6 lg:mb-8 font-medium leading-relaxed">
            Join travelers who plan smarter with BagItUp
          </p>
          <Link
            href="/auth"
            className="inline-block w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#4FC3F7] to-[#0288D1] text-white text-base md:text-lg font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all shadow-lg border border-white/20"
          >
            Sign Up Now
          </Link>
        </motion.div>
      </section>
    </main>
  )
}

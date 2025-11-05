'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTrip } from '@/lib/context/TripContext'
import Image from 'next/image'

interface CityInfo {
  destination: string
  country: string
  overview: string
  history: string
  attractions: string[]
  weather: {
    season: string
    temperature: string
    rainfall: string
  }
  safety: {
    rating: string
    tips: string[]
  }
  etiquette: {
    dos: string[]
    donts: string[]
  }
  language: {
    official: string
    useful_phrases: { phrase: string; translation: string }[]
  }
  transportation: {
    airport: string
    public_transport: string[]
    taxi_info: string
  }
}

export default function AboutPage() {
  const { trip } = useTrip()
  const [cityInfo, setCityInfo] = useState<CityInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCityInfo = async () => {
      if (!trip?.destination) {
        setError('No destination selected')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        
        // Call Gemini API for dynamic content
        const response = await fetch('/api/gemini/about', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destination: trip.destination,
            groupType: trip.groupType,
            startDate: trip.startDate,
            endDate: trip.endDate,
          }),
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch city information')
        }

        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        setCityInfo(data)
        setError('')
      } catch (err) {
        console.error('Error fetching city info:', err)
        setError('Failed to load city information. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchCityInfo()
  }, [trip?.destination, trip?.startDate, trip?.endDate, trip?.groupType])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#016B61]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#016B61] text-white rounded-lg hover:bg-[#015850] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!cityInfo) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">No city information available</p>
      </div>
    )
  }

  const getDurationText = () => {
    if (!trip?.startDate || !trip?.endDate) return ''
    const start = new Date(trip.startDate)
    const end = new Date(trip.endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return `${days} ${days === 1 ? 'day' : 'days'}`
  }

  return (
    <div className="space-y-6 md:space-y-8 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section with Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full"
      >
        {/* Google Maps */}
        <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg bg-gray-100">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(cityInfo.destination + ', ' + cityInfo.country)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          />
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-bold text-[#016B61]">{cityInfo.destination}</h2>
            <p className="text-xs sm:text-sm text-gray-600">{cityInfo.country}</p>
          </div>
        </div>
      </motion.div>

      {/* Trip Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#016B61] mb-3 sm:mb-4">Your Trip Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm sm:text-base">
          <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-xs sm:text-sm mb-1">Destination</p>
            <p className="font-semibold text-gray-900">{cityInfo.destination}, {cityInfo.country}</p>
          </div>
          <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-xs sm:text-sm mb-1">Duration</p>
            <p className="font-semibold text-gray-900">{getDurationText()}</p>
          </div>
          <div className="p-3 sm:p-4 bg-gray-50 rounded-lg sm:col-span-2 lg:col-span-1">
            <p className="text-gray-500 text-xs sm:text-sm mb-1">Travel Type</p>
            <p className="font-semibold text-gray-900 capitalize">{trip?.groupType || 'Solo'}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Overview</h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{cityInfo.overview}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">History & Culture</h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{cityInfo.history}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Famous Attractions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {cityInfo.attractions?.map((attraction, index) => (
            <div
              key={index}
              className="flex items-start gap-2 p-3 bg-[#E5E9C5] rounded-lg text-sm sm:text-base"
            >
              <span className="text-[#016B61] mt-0.5 sm:mt-1 flex-shrink-0">📍</span>
              <span className="text-gray-800">{attraction}</span>
            </div>
          )) || <p className="text-gray-500">No attractions data available</p>}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Weather & Climate</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Season</p>
            <p className="font-semibold text-sm sm:text-base text-gray-900">{cityInfo.weather.season}</p>
          </div>
          <div className="p-3 sm:p-4 bg-orange-50 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Temperature</p>
            <p className="font-semibold text-sm sm:text-base text-gray-900">{cityInfo.weather.temperature}</p>
          </div>
          <div className="p-3 sm:p-4 bg-cyan-50 rounded-lg sm:col-span-2 lg:col-span-1">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Rainfall</p>
            <p className="font-semibold text-sm sm:text-base text-gray-900">{cityInfo.weather.rainfall}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Safety Information</h3>
        <div className="mb-3 sm:mb-4">
          <span className="inline-block px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-semibold">
            Safety Rating: {cityInfo.safety.rating}
          </span>
        </div>
        <div className="space-y-2">
          {cityInfo.safety?.tips?.map((tip, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
              <span className="text-sm sm:text-base text-gray-700">{tip}</span>
            </div>
          )) || <p className="text-gray-500">No safety tips available</p>}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Local Etiquette</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h4 className="font-semibold text-sm sm:text-base text-green-700 mb-3 flex items-center gap-2">
              <span>✓</span> Do&apos;s
            </h4>
            <ul className="space-y-2">
              {cityInfo.etiquette?.dos?.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
                  <span className="text-green-600 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              )) || <li className="text-gray-500">No data available</li>}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base text-red-700 mb-3 flex items-center gap-2">
              <span>✗</span> Don&apos;ts
            </h4>
            <ul className="space-y-2">
              {cityInfo.etiquette?.donts?.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
                  <span className="text-red-600 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              )) || <li className="text-gray-500">No data available</li>}
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Language & Useful Phrases</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
          Official Language: <span className="font-semibold text-gray-900">{cityInfo.language?.official}</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {cityInfo.language?.useful_phrases?.map((item, index) => (
            <div key={index} className="p-3 bg-[#9ECFD4] bg-opacity-20 rounded-lg">
              <p className="font-semibold text-sm sm:text-base text-gray-900">{item.phrase}</p>
              <p className="text-xs sm:text-sm text-gray-600 italic">{item.translation}</p>
            </div>
          )) || <p className="text-gray-500">No phrases available</p>}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Transportation</h3>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">✈️ Airport</h4>
            <p className="text-sm sm:text-base text-gray-700">{cityInfo.transportation.airport}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">🚇 Public Transport</h4>
            <ul className="space-y-1">
              {cityInfo.transportation?.public_transport?.map((transport, index) => (
                <li key={index} className="text-sm sm:text-base text-gray-700 ml-4">• {transport}</li>
              )) || <li className="text-gray-500 ml-4">No data available</li>}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">🚖 Taxi Information</h4>
            <p className="text-sm sm:text-base text-gray-700">{cityInfo.transportation?.taxi_info}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

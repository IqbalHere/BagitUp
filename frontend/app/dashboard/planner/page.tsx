'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTrip } from '@/lib/context/TripContext'

interface Activity {
  time: string
  activity: string
  location: string
  duration: string
  tips?: string[]
}

interface Meals {
  breakfast: string
  lunch: string
  dinner: string
}

interface ItineraryDay {
  day: number
  title: string
  activities: Activity[]
  meals: Meals
}

interface ItineraryResponse {
  destination: string
  totalDays: number
  itinerary: ItineraryDay[]
  overview: string
  tips: string[]
}

export default function PlannerPage() {
  const { trip, getDurationInDays } = useTrip()
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([])
  const [tips, setTips] = useState<string[]>([])
  const [overview, setOverview] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!trip) return

    const fetchItinerary = async () => {
      setLoading(true)
      try {
        const days = getDurationInDays()
        const response = await fetch('/api/gemini/itinerary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destination: trip.destination,
            days
          })
        })
        const data = await response.json()
        
        if (data.error) {
          console.error('API error:', data.error)
        }
        
        setItinerary(data.itinerary || [])
        setTips(data.tips || [])
        setOverview(data.overview || '')
      } catch (error) {
        console.error('Error fetching itinerary:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchItinerary()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip?.destination, trip?.startDate, trip?.endDate])

  if (!trip) {
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-4xl mb-4">📅</div>
          <p className="text-tealgreen text-lg">Generating your itinerary...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 md:p-8 border border-gray-100"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-tealgreen">
          Your {getDurationInDays()}-Day Itinerary
        </h1>
        <p className="text-gray-600">
          AI-generated personalized plan for {trip.destination}
        </p>
      </motion.div>

      {/* Travel Tips */}
      {tips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-lightblue bg-opacity-20 rounded-xl p-6 border border-lightblue"
        >
          <h2 className="text-xl font-bold mb-3 text-tealgreen">💡 Travel Tips</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-coolseablue mt-1">→</span>
                <span className="text-gray-700 text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Itinerary Days */}
      <div className="space-y-6">
        {itinerary.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
          >
            {/* Day Header */}
            <div className="bg-tealgreen text-white p-4 md:p-6">
              <h2 className="text-2xl font-bold">Day {day.day}</h2>
              <p className="text-lightblue text-sm mt-1">{day.title}</p>
            </div>

            {/* Day Schedule */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Activities */}
              {day.activities?.map((activity, actIndex) => (
                <div key={actIndex} className="border-l-2 border-coolseablue pl-4">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-coolseablue font-semibold text-sm min-w-[80px]">
                      {activity.time}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {activity.activity}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <span>📍 {activity.location}</span>
                        <span>•</span>
                        <span>⏱️ {activity.duration}</span>
                      </div>
                      {activity.tips && (
                        <ul className="mt-2 space-y-1">
                          {(Array.isArray(activity.tips) ? activity.tips : [activity.tips]).map((tip, tipIndex) => (
                            <li key={tipIndex} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-tealgreen">→</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Meals */}
              {day.meals && (
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🍽️</span>
                    <span>Meal Suggestions</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-cream bg-opacity-30 rounded-lg p-3">
                      <p className="text-xs font-semibold text-gray-600 mb-1">🌅 Breakfast</p>
                      <p className="text-sm text-gray-900">{day.meals.breakfast}</p>
                    </div>
                    <div className="bg-cream bg-opacity-30 rounded-lg p-3">
                      <p className="text-xs font-semibold text-gray-600 mb-1">☀️ Lunch</p>
                      <p className="text-sm text-gray-900">{day.meals.lunch}</p>
                    </div>
                    <div className="bg-cream bg-opacity-30 rounded-lg p-3">
                      <p className="text-xs font-semibold text-gray-600 mb-1">🌆 Dinner</p>
                      <p className="text-sm text-gray-900">{day.meals.dinner}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-gray-600 text-sm py-4"
      >
        <p>
          This is a suggested itinerary. Feel free to customize based on your preferences and pace.
        </p>
      </motion.div>
    </div>
  )
}

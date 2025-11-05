'use client'

import { motion } from 'framer-motion'
import { useTrip } from '@/lib/context/TripContext'

interface AffiliateCard {
  name: string
  logo: string
  description: string
  url: string
  color: string
}

export default function BookingsPage() {
  const { trip } = useTrip()

  if (!trip) {
    return null
  }

  const hotelPartners: AffiliateCard[] = [
    {
      name: 'Booking.com',
      logo: '🏨',
      description: 'Find the best hotel deals with free cancellation',
      url: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(trip.destination)}`,
      color: 'bg-blue-50 border-blue-200',
    },
    {
      name: 'Agoda',
      logo: '🏩',
      description: 'Exclusive member prices and rewards',
      url: `https://www.agoda.com/search?city=${encodeURIComponent(trip.destination)}`,
      color: 'bg-red-50 border-red-200',
    },
    {
      name: 'Hotels.com',
      logo: '🏪',
      description: 'Collect nights, get rewarded',
      url: `https://www.hotels.com/search.do?q-destination=${encodeURIComponent(trip.destination)}`,
      color: 'bg-purple-50 border-purple-200',
    },
  ]

  const flightPartners: AffiliateCard[] = [
    {
      name: 'Skyscanner',
      logo: '✈️',
      description: 'Compare flights from 1000+ airlines',
      url: `https://www.skyscanner.com/transport/flights-to/${encodeURIComponent(trip.destination)}`,
      color: 'bg-teal-50 border-teal-200',
    },
    {
      name: 'Kayak',
      logo: '🛫',
      description: 'Search hundreds of travel sites at once',
      url: `https://www.kayak.com/flights-to-${encodeURIComponent(trip.destination)}`,
      color: 'bg-orange-50 border-orange-200',
    },
    {
      name: 'Google Flights',
      logo: '🌐',
      description: 'Track prices and find the best time to fly',
      url: `https://www.google.com/travel/flights?q=flights%20to%20${encodeURIComponent(trip.destination)}`,
      color: 'bg-green-50 border-green-200',
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
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
          Bookings & Travel Deals
        </h1>
        <p className="text-gray-600">
          Find the best deals for your trip to {trip.destination}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700">
          <span>📅 {formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
          <span>👥 {trip.groupType}</span>
        </div>
      </motion.div>

      {/* Hotels Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-tealgreen">🏨 Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotelPartners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`block bg-white rounded-xl p-6 border-2 ${partner.color} hover:shadow-lg transition-all group`}
            >
              <div className="text-4xl mb-3">{partner.logo}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-tealgreen transition-colors">
                {partner.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
              <div className="flex items-center text-tealgreen font-semibold text-sm">
                View Deals →
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Flights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-tealgreen">✈️ Flights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flightPartners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`block bg-white rounded-xl p-6 border-2 ${partner.color} hover:shadow-lg transition-all group`}
            >
              <div className="text-4xl mb-3">{partner.logo}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-tealgreen transition-colors">
                {partner.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
              <div className="flex items-center text-tealgreen font-semibold text-sm">
                Search Flights →
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-lightblue bg-opacity-20 rounded-xl p-6 border border-lightblue"
      >
        <h3 className="text-lg font-bold mb-3 text-tealgreen">💡 Booking Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-coolseablue mt-0.5">→</span>
            <span>Book flights on Tuesday or Wednesday for better deals</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-coolseablue mt-0.5">→</span>
            <span>Compare prices across multiple sites before booking</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-coolseablue mt-0.5">→</span>
            <span>Check hotel cancellation policies for flexibility</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-coolseablue mt-0.5">→</span>
            <span>Sign up for price alerts to track fare changes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-coolseablue mt-0.5">→</span>
            <span>Consider booking packages for additional savings</span>
          </li>
        </ul>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-gray-500 text-xs py-4"
      >
        <p>
          Note: These are affiliate links. We may earn a commission at no extra cost to you.
        </p>
      </motion.div>
    </div>
  )
}

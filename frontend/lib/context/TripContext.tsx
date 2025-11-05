'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface TripData {
  destination: string
  startDate: string
  endDate: string
  groupType: 'solo' | 'couple' | 'family' | 'friends' | 'business'
}

interface TripContextType {
  trip: TripData | null
  setTrip: (trip: TripData) => void
  clearTrip: () => void
  hasTrip: boolean
  getDurationInDays: () => number
}

const TripContext = createContext<TripContextType>({
  trip: null,
  setTrip: () => {},
  clearTrip: () => {},
  hasTrip: false,
  getDurationInDays: () => 0,
})

export const useTrip = () => useContext(TripContext)

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [trip, setTripState] = useState<TripData | null>(null)
  const [mounted, setMounted] = useState(false)

  // Load trip from localStorage on mount
  useEffect(() => {
    const savedTrip = localStorage.getItem('bagitup_trip')
    if (savedTrip) {
      try {
        setTripState(JSON.parse(savedTrip))
      } catch (error) {
        console.error('Error loading trip from localStorage:', error)
      }
    }
    setMounted(true)
  }, [])

  const setTrip = (tripData: TripData) => {
    setTripState(tripData)
    localStorage.setItem('bagitup_trip', JSON.stringify(tripData))
  }

  const clearTrip = () => {
    setTripState(null)
    localStorage.removeItem('bagitup_trip')
  }

  const getDurationInDays = () => {
    if (!trip) return 0
    const start = new Date(trip.startDate)
    const end = new Date(trip.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <TripContext.Provider
      value={{
        trip,
        setTrip,
        clearTrip,
        hasTrip: !!trip,
        getDurationInDays,
      }}
    >
      {mounted ? children : null}
    </TripContext.Provider>
  )
}

import apiClient from './client'
import { Trip, Product, Recommendation } from '@/lib/types'

// Trip APIs
export const tripApi = {
  getAll: async () => {
    const response = await apiClient.get<{ trips: Trip[] }>('/api/trips')
    return response.data.trips
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Trip>(`/api/trips/${id}`)
    return response.data
  },

  create: async (tripData: Partial<Trip>) => {
    const response = await apiClient.post<Trip>('/api/trips', tripData)
    return response.data
  },

  update: async (id: string, tripData: Partial<Trip>) => {
    const response = await apiClient.put<Trip>(`/api/trips/${id}`, tripData)
    return response.data
  },

  delete: async (id: string) => {
    await apiClient.delete(`/api/trips/${id}`)
  },
}

// Product APIs
export const productApi = {
  getAll: async (params?: { category?: string; search?: string; featured?: boolean }) => {
    const response = await apiClient.get<{ products: Product[] }>('/api/products', { params })
    return response.data.products
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Product>(`/api/products/${id}`)
    return response.data
  },
}

// Recommendation APIs
export const recommendationApi = {
  getForTrip: async (tripId: string) => {
    const response = await apiClient.get<{
      success: boolean
      recommendation: Recommendation
      fromCache: boolean
    }>(`/api/recommendations/${tripId}`)
    return response.data
  },

  getUserRecommendations: async () => {
    const response = await apiClient.get<{
      recommendations: Recommendation[]
    }>('/api/recommendations/user')
    return response.data.recommendations
  },
}

// Stripe APIs
export const stripeApi = {
  createCheckoutSession: async (productId: string, quantity: number = 1) => {
    const response = await apiClient.post<{
      success: boolean
      sessionId: string
      url: string
    }>('/api/stripe/create-checkout-session', { productId, quantity })
    return response.data
  },

  verifySession: async (sessionId: string) => {
    const response = await apiClient.get<{
      success: boolean
      session: any
    }>(`/api/stripe/session/${sessionId}`)
    return response.data
  },

  getStatus: async () => {
    const response = await apiClient.get<{
      success: boolean
      stripeEnabled: boolean
      configured: boolean
    }>('/api/stripe/status')
    return response.data
  },
}

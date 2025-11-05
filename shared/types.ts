export interface User {
  id: string
  firebaseUid: string
  email: string
  displayName?: string
  photoURL?: string
  createdAt: string
  updatedAt: string
}

export interface Trip {
  _id: string
  userId: string
  destination: string
  startDate: string
  endDate: string
  duration: number
  preferences: {
    activities?: string[]
    climate?: string
    budget?: 'low' | 'medium' | 'high'
    travelStyle?: string
  }
  recommendations?: string[]
  status: 'planning' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  _id: string
  name: string
  description: string
  category: string
  price: number
  currency: string
  affiliateUrl: string
  affiliatePartner?: string
  imageUrl: string
  tags: string[]
  rating?: number
  reviewCount?: number
  inStock: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface Recommendation {
  _id: string
  tripId: string
  userId: string
  products: Array<{
    productId: Product | string
    reason: string
    priority: 'essential' | 'recommended' | 'optional'
  }>
  aiPrompt: string
  aiResponse: string
  cacheKey?: string
  expiresAt?: string
  createdAt: string
  updatedAt: string
}

export interface Item {
  _id: string
  title: string
  description: string
  category: string
  userId: string
  imageUrl?: string
  tags: string[]
  status: 'active' | 'archived' | 'deleted'
  createdAt: string
  updatedAt: string
}

export interface PaginationResponse<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

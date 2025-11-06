import { GroqService } from './groqService'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Redis } from '@upstash/redis'
import crypto from 'crypto'

// Initialize Gemini AI (fallback)
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

interface TripDetails {
  destination: string
  duration: number
  startDate: Date
  climate?: string
  activities?: string[]
  budget?: 'Budget' | 'Moderate' | 'Luxury' | 'Ultra-Luxury' | 'low' | 'medium' | 'high'
  travelStyle?: string
}

export class RecommendationService {
  /**
   * Generate a cache key from trip details
   */
  private static generateCacheKey(tripDetails: TripDetails): string {
    const dataString = JSON.stringify({
      destination: tripDetails.destination.toLowerCase().trim(),
      duration: tripDetails.duration,
      climate: tripDetails.climate,
      activities: tripDetails.activities?.sort(),
      budget: tripDetails.budget,
      travelStyle: tripDetails.travelStyle,
    })
    return `trip:recommendation:${crypto.createHash('md5').update(dataString).digest('hex')}`
  }

  /**
   * Get recommendations from cache
   */
  private static async getFromCache(cacheKey: string): Promise<string | null> {
    if (!redis) return null

    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        console.log(`✅ Cache hit for key: ${cacheKey}`)
        return cached as string
      }
    } catch (error) {
      console.error('Redis cache read error:', error)
    }
    return null
  }

  /**
   * Store recommendations in cache
   */
  private static async storeInCache(cacheKey: string, data: string, ttl: number = 86400): Promise<void> {
    if (!redis) return

    try {
      await redis.set(cacheKey, data, { ex: ttl }) // 24 hours default TTL
      console.log(`✅ Cached result for key: ${cacheKey} (TTL: ${ttl}s)`)
    } catch (error) {
      console.error('Redis cache write error:', error)
    }
  }

  /**
   * Build the AI prompt for trip recommendations
   */
  private static buildPrompt(tripDetails: TripDetails): string {
    const { destination, duration, climate, activities, budget, travelStyle } = tripDetails

    let prompt = `You are a travel gear expert. Suggest a comprehensive packing list for a ${duration}-day trip to ${destination}.`

    if (climate) {
      prompt += `\nClimate: ${climate}`
    }

    if (activities && activities.length > 0) {
      prompt += `\nPlanned activities: ${activities.join(', ')}`
    }

    if (budget) {
      prompt += `\nBudget level: ${budget}`
    }

    if (travelStyle) {
      prompt += `\nTravel style: ${travelStyle}`
    }

    prompt += `\n\nFor each recommended item, provide:
1. Item name (specific and searchable)
2. Brief reason why it's needed
3. Priority level (essential, recommended, or optional)

Format your response as a JSON array with this structure:
[
  {
    "name": "Item name",
    "reason": "Why you need it",
    "priority": "essential|recommended|optional",
    "category": "luggage|clothing|electronics|accessories|toiletries|outdoor-gear|travel-docs|health-safety|comfort|tech-gadgets|other"
  }
]

Focus on practical, commonly available products that a Gen-Z traveler would appreciate. Include 15-25 items total.`

    return prompt
  }

  /**
   * Generate mock recommendations for development
   */
  private static generateMockRecommendations(): string {
    const mockItems = [
      {
        name: 'Lightweight Backpack',
        reason: 'Essential for carrying your daily items during the trip',
        priority: 'high',
        category: 'bags',
      },
      {
        name: 'Travel Adapter',
        reason: 'Important for keeping your devices charged',
        priority: 'high',
        category: 'electronics',
      },
      {
        name: 'Quick-Dry Towel',
        reason: 'Space-saving and practical for various activities',
        priority: 'medium',
        category: 'accessories',
      },
      {
        name: 'Portable Charger',
        reason: 'Keep your phone charged during long days of exploration',
        priority: 'high',
        category: 'electronics',
      },
      {
        name: 'Reusable Water Bottle',
        reason: 'Stay hydrated and reduce plastic waste',
        priority: 'medium',
        category: 'accessories',
      },
      {
        name: 'First Aid Kit',
        reason: 'Always good to have basic medical supplies',
        priority: 'medium',
        category: 'health',
      },
      {
        name: 'Sunscreen',
        reason: 'Protect your skin from UV rays',
        priority: 'high',
        category: 'health',
      },
      {
        name: 'Travel Pillow',
        reason: 'Comfort during long flights or bus rides',
        priority: 'low',
        category: 'comfort',
      },
    ]

    return JSON.stringify(mockItems)
  }

  /**
   * Call AI API to generate recommendations (Groq preferred, Gemini fallback)
   */
  private static async callAI(prompt: string): Promise<string> {
    // Development mode bypass
    if (process.env.NODE_ENV === 'development' && process.env.USE_MOCK_RECOMMENDATIONS === 'true') {
      console.log('🔧 Development mode: Using mock recommendations (AI bypassed)')
      return this.generateMockRecommendations()
    }

    // Try Groq first (faster and better)
    if (GroqService.isAvailable()) {
      console.log('🚀 Using Groq AI for recommendations...')
      try {
        const fullPrompt = `${prompt}

Format your response as a JSON object with this exact structure:
{
  "items": [
    {
      "name": "Item name",
      "reason": "Why you need it",
      "priority": "essential|recommended|optional",
      "category": "luggage|clothing|electronics|accessories|toiletries|outdoor-gear|travel-docs|health-safety|comfort|tech-gadgets|other"
    }
  ]
}

Focus on practical, commonly available products that a Gen-Z traveler would appreciate. Include 15-25 items total.`

        const response = await GroqService.generateRecommendations(fullPrompt)
        console.log('✅ Groq AI response received')
        
        // Parse and re-stringify to ensure consistency
        const parsed = JSON.parse(response)
        return JSON.stringify(parsed.items || parsed)
      } catch (error) {
        console.error('⚠️ Groq AI failed, falling back to Gemini:', error)
        // Fall through to Gemini
      }
    }

    // Fallback to Gemini if Groq is not available or failed
    if (!genAI) {
      throw new Error('No AI service is configured. Please set GROQ_API_KEY or GEMINI_API_KEY environment variable.')
    }

    console.log('🤖 Using Google Gemini AI for recommendations (fallback)...')

    // Use Gemini 2.0 Flash Experimental for recommendations (latest and fastest)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    const fullPrompt = `You are a helpful travel packing assistant with expertise in travel gear and equipment. Always respond with valid JSON.

${prompt}`

    const result = await model.generateContent(fullPrompt)
    const response = result.response.text()
    
    console.log('✅ Gemini AI response received')
    return response
  }

  /**
   * Main method to get trip recommendations
   */
  public static async getTripRecommendations(tripDetails: TripDetails): Promise<{
    recommendations: string
    cacheKey: string
    fromCache: boolean
  }> {
    // Generate cache key
    const cacheKey = this.generateCacheKey(tripDetails)

    // Try to get from cache first
    const cachedResult = await this.getFromCache(cacheKey)
    if (cachedResult) {
      return {
        recommendations: cachedResult,
        cacheKey,
        fromCache: true,
      }
    }

    // Build prompt
    const prompt = this.buildPrompt(tripDetails)

    // Call AI (Groq or Gemini)
    const aiResponse = await this.callAI(prompt)

    // Cache the result
    await this.storeInCache(cacheKey, aiResponse)

    return {
      recommendations: aiResponse,
      cacheKey,
      fromCache: false,
    }
  }

  /**
   * Parse AI response and extract items
   */
  public static parseRecommendations(aiResponse: string | any): Array<{
    name: string
    reason: string
    priority: string
    category: string
  }> {
    try {
      // If already an array (from cache), return it
      if (Array.isArray(aiResponse)) {
        return aiResponse
      }

      // If it's a string, try to parse it
      if (typeof aiResponse === 'string') {
        // Try to extract JSON from the response
        const jsonMatch = aiResponse.match(/\[[\s\S]*\]/)
        if (!jsonMatch) {
          throw new Error('No JSON array found in response')
        }

        const items = JSON.parse(jsonMatch[0])
        return items
      }

      // Otherwise return empty array
      console.warn('Unexpected aiResponse type:', typeof aiResponse)
      return []
    } catch (error) {
      console.error('Failed to parse AI response:', error)
      return []
    }
  }

  /**
   * Check if services are available
   */
  public static isAvailable(): { groq: boolean; gemini: boolean; redis: boolean } {
    return {
      groq: GroqService.isAvailable(),
      gemini: !!genAI,
      redis: !!redis,
    }
  }
}

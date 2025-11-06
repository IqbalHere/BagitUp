import Groq from 'groq-sdk'

// Initialize Groq client
const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export class GroqService {
  /**
   * Call Groq API with a prompt
   */
  public static async chat(
    messages: ChatMessage[],
    options: {
      model?: string
      temperature?: number
      maxTokens?: number
    } = {}
  ): Promise<string> {
    if (!groq) {
      throw new Error('Groq API is not configured. Please set GROQ_API_KEY environment variable.')
    }

    const {
      model = 'llama-3.3-70b-versatile', // Fast and powerful
      temperature = 0.7,
      maxTokens = 2048,
    } = options

    console.log(`🤖 Calling Groq AI (${model})...`)

    try {
      const completion = await groq.chat.completions.create({
        messages,
        model,
        temperature,
        max_tokens: maxTokens,
        response_format: { type: 'json_object' }, // Force JSON response
      })

      const response = completion.choices[0]?.message?.content || ''
      console.log('✅ Groq AI response received')
      
      return response
    } catch (error: any) {
      console.error('❌ Groq API error:', error.message)
      throw new Error(`Groq API failed: ${error.message}`)
    }
  }

  /**
   * Generate travel recommendations using Groq
   */
  public static async generateRecommendations(prompt: string): Promise<string> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are a helpful travel packing assistant with expertise in travel gear and equipment. Always respond with valid JSON only, no markdown formatting.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ]

    return await this.chat(messages, {
      model: 'llama-3.3-70b-versatile', // Best balance of speed and quality
      temperature: 0.7,
      maxTokens: 2048,
    })
  }

  /**
   * Check if Groq is available
   */
  public static isAvailable(): boolean {
    return !!groq
  }

  /**
   * List available models
   */
  public static getAvailableModels(): string[] {
    return [
      'llama-3.3-70b-versatile',     // Recommended: Fast and powerful
      'llama-3.1-8b-instant',        // Fastest
      'mixtral-8x7b-32768',          // Large context
      'gemma2-9b-it',                // Good for chat
    ]
  }
}

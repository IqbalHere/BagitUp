import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { destination, groupType, startDate, endDate } = await req.json()

    if (!destination) {
      return NextResponse.json(
        { error: 'Destination is required' },
        { status: 400 }
      )
    }

    const prompt = `
You are a travel expert. Provide comprehensive information about ${destination} for a ${groupType || 'solo'} trip from ${startDate} to ${endDate}.

Return the information in this EXACT JSON format (no markdown, just valid JSON):
{
  "destination": "${destination}",
  "country": "Country name",
  "overview": "2-3 sentences about the city",
  "history": "Brief historical background in 2-3 sentences",
  "attractions": ["Attraction 1", "Attraction 2", "Attraction 3", "Attraction 4", "Attraction 5"],
  "weather": {
    "season": "Current season",
    "temperature": "Temperature range (e.g., 20-25°C)",
    "rainfall": "Rainfall info (e.g., Low, Moderate, High)"
  },
  "safety": {
    "rating": "Safe/Very Safe/Exercise Caution",
    "tips": ["Safety tip 1", "Safety tip 2", "Safety tip 3"]
  },
  "etiquette": {
    "dos": ["Do this", "Do that", "Do this too"],
    "donts": ["Don't do this", "Don't do that", "Don't do this either"]
  },
  "language": {
    "official": "Official language",
    "useful_phrases": [
      {"phrase": "Hello", "translation": "Local translation"},
      {"phrase": "Thank you", "translation": "Local translation"},
      {"phrase": "How much?", "translation": "Local translation"},
      {"phrase": "Where is...?", "translation": "Local translation"}
    ]
  },
  "transportation": {
    "airport": "Main airport name and code",
    "public_transport": ["Metro", "Bus", "Tram"],
    "taxi_info": "Taxi information and pricing"
  }
}

Make sure all fields are filled with accurate, helpful information.
`

    const apiKey = process.env.GROQ_API_KEY
    console.log('Groq API Key present:', !!apiKey, 'Length:', apiKey?.length)

    // If no API key or invalid, use fallback immediately
    if (!apiKey || apiKey.length < 30) {
      console.warn('GROQ_API_KEY not configured or invalid, using fallback data')
      // Return fallback data if API key is not configured
      return NextResponse.json({
        destination: destination,
        country: 'Unknown',
        overview: `${destination} is a popular travel destination known for its unique culture and attractions.`,
        history: 'Rich historical background with centuries of cultural heritage.',
        attractions: [
          'Historic City Center',
          'Local Museums',
          'Cultural Landmarks',
          'Scenic Viewpoints',
          'Traditional Markets',
        ],
        weather: {
          season: 'Current Season',
          temperature: '15-25°C',
          rainfall: 'Moderate',
        },
        safety: {
          rating: 'Safe',
          tips: [
            'Keep valuables secure',
            'Stay aware of your surroundings',
            'Use official transportation',
          ],
        },
        etiquette: {
          dos: [
            'Respect local customs',
            'Dress appropriately',
            'Learn basic phrases',
          ],
          donts: [
            "Don't litter",
            "Don't be loud in public",
            "Don't ignore local laws",
          ],
        },
        language: {
          official: 'Local Language',
          useful_phrases: [
            { phrase: 'Hello', translation: 'Hello' },
            { phrase: 'Thank you', translation: 'Thanks' },
            { phrase: 'How much?', translation: 'Price?' },
            { phrase: 'Where is...?', translation: 'Location?' },
          ],
        },
        transportation: {
          airport: 'International Airport',
          public_transport: ['Metro', 'Bus', 'Taxi'],
          taxi_info: 'Taxis available at standard rates',
        },
      })
    }

    const groqRes = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      }
    )

    if (!groqRes.ok) {
      const errorBody = await groqRes.text()
      console.error('Groq API error:', groqRes.status, errorBody)
      console.warn('Falling back to static data due to API error')
      
      // Return fallback data instead of throwing error
      return NextResponse.json({
        destination: destination,
        country: 'Unknown',
        overview: `${destination} is a popular travel destination known for its unique culture and attractions.`,
        history: 'Rich historical background with centuries of cultural heritage.',
        attractions: [
          'Historic City Center',
          'Local Museums',
          'Cultural Landmarks',
          'Scenic Viewpoints',
          'Traditional Markets',
        ],
        weather: {
          season: 'Current Season',
          temperature: '15-25°C',
          rainfall: 'Moderate',
        },
        safety: {
          rating: 'Safe',
          tips: [
            'Keep valuables secure',
            'Stay aware of your surroundings',
            'Use official transportation',
          ],
        },
        etiquette: {
          dos: [
            'Respect local customs',
            'Dress appropriately',
            'Learn basic phrases',
          ],
          donts: [
            "Don't litter",
            "Don't be loud in public",
            "Don't ignore local laws",
          ],
        },
        language: {
          official: 'Local Language',
          useful_phrases: [
            { phrase: 'Hello', translation: 'Hello' },
            { phrase: 'Thank you', translation: 'Thanks' },
            { phrase: 'How much?', translation: 'Price?' },
            { phrase: 'Where is...?', translation: 'Location?' },
          ],
        },
        transportation: {
          airport: 'International Airport',
          public_transport: ['Metro', 'Bus', 'Taxi'],
          taxi_info: 'Taxis available at standard rates',
        },
      })
    }

    const data = await groqRes.json()
    const text = data?.choices?.[0]?.message?.content ?? 'No response'

    // Try to parse JSON from the response
    try {
      // Remove markdown code blocks if present
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const jsonData = JSON.parse(cleanText)
      return NextResponse.json(jsonData)
    } catch (parseError) {
      console.error('Failed to parse Groq response as JSON:', parseError)
      console.log('Raw response:', text)
      
      // Return a structured error with the raw text
      return NextResponse.json(
        {
          error: 'Failed to parse AI response',
          rawText: text,
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in Groq about API:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to generate city information', details: errorMessage },
      { status: 500 }
    )
  }
}

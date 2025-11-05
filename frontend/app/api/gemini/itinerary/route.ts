import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { destination, days } = await req.json()

    if (!destination || !days) {
      return NextResponse.json(
        { error: 'Destination and days are required' },
        { status: 400 }
      )
    }

    const prompt = `
Create a detailed ${days}-day travel itinerary for ${destination}.

Return the information in this EXACT JSON format (no markdown, just valid JSON):
{
  "destination": "${destination}",
  "totalDays": ${days},
  "itinerary": [
    {
      "day": 1,
      "title": "Day 1 - Arrival and Exploration",
      "activities": [
        {
          "time": "9:00 AM",
          "activity": "Activity description",
          "location": "Location name",
          "duration": "2 hours",
          "tips": ["Helpful tip 1", "Helpful tip 2"]
        }
      ],
      "meals": {
        "breakfast": "Restaurant/location suggestion",
        "lunch": "Restaurant/location suggestion",
        "dinner": "Restaurant/location suggestion"
      }
    }
  ],
  "overview": "Brief overview of the ${days}-day trip",
  "tips": ["General tip 1", "General tip 2", "General tip 3"]
}

For each day, include:
- 3-5 activities with specific times (morning, afternoon, evening)
- Meal recommendations
- Realistic timing and locations
- Mix of must-see attractions, local experiences, and relaxation

Make it practical, engaging, and suitable for ${days} days.
`

    const apiKey = process.env.GROQ_API_KEY
    console.log('Groq API Key present:', !!apiKey, 'Length:', apiKey?.length)

    // If no API key or invalid, use fallback immediately
    if (!apiKey || apiKey.length < 30) {
      console.warn('GROQ_API_KEY not configured or invalid, using fallback data')
      // Return fallback itinerary
      const fallbackItinerary = []
      for (let i = 1; i <= days; i++) {
        fallbackItinerary.push({
          day: i,
          title: `Day ${i} - Exploring ${destination}`,
          activities: [
            {
              time: '9:00 AM',
              activity: 'Morning exploration of local attractions',
              location: 'City Center',
              duration: '3 hours',
              tips: ['Arrive early to avoid crowds', 'Wear comfortable walking shoes'],
            },
            {
              time: '2:00 PM',
              activity: 'Visit cultural sites and museums',
              location: 'Historic District',
              duration: '2 hours',
              tips: ['Check opening hours in advance', 'Consider getting a city pass'],
            },
            {
              time: '6:00 PM',
              activity: 'Evening walk and local dining',
              location: 'Dining District',
              duration: '2 hours',
              tips: ['Try local specialties', 'Make reservations ahead'],
            },
          ],
          meals: {
            breakfast: 'Local café in the city center',
            lunch: 'Traditional restaurant near attractions',
            dinner: 'Popular local eatery',
          },
        })
      }

      return NextResponse.json({
        destination: destination,
        totalDays: days,
        itinerary: fallbackItinerary,
        overview: `A ${days}-day adventure in ${destination} filled with culture, cuisine, and unforgettable experiences.`,
        tips: [
          'Book popular attractions in advance',
          'Carry a map or download offline maps',
          'Learn a few local phrases',
          'Stay hydrated and wear comfortable shoes',
        ],
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
          temperature: 0.8,
          max_tokens: 4096,
        }),
      }
    )

    if (!groqRes.ok) {
      const errorBody = await groqRes.text()
      console.error('Groq API error:', groqRes.status, errorBody)
      console.warn('Falling back to static data due to API error')
      
      // Return fallback itinerary instead of throwing error
      const fallbackItinerary = []
      for (let i = 1; i <= days; i++) {
        fallbackItinerary.push({
          day: i,
          title: `Day ${i} - Exploring ${destination}`,
          activities: [
            {
              time: '9:00 AM',
              activity: 'Morning exploration of local attractions',
              location: 'City Center',
              duration: '3 hours',
              tips: ['Arrive early to avoid crowds', 'Wear comfortable walking shoes'],
            },
            {
              time: '2:00 PM',
              activity: 'Visit cultural sites and museums',
              location: 'Historic District',
              duration: '2 hours',
              tips: ['Check opening hours in advance', 'Consider getting a city pass'],
            },
            {
              time: '6:00 PM',
              activity: 'Evening walk and local dining',
              location: 'Dining District',
              duration: '2 hours',
              tips: ['Try local specialties', 'Make reservations ahead'],
            },
          ],
          meals: {
            breakfast: 'Local café in the city center',
            lunch: 'Traditional restaurant near attractions',
            dinner: 'Popular local eatery',
          },
        })
      }

      return NextResponse.json({
        destination: destination,
        totalDays: days,
        itinerary: fallbackItinerary,
        overview: `A ${days}-day adventure in ${destination} filled with culture, cuisine, and unforgettable experiences.`,
        tips: [
          'Book popular attractions in advance',
          'Carry a map or download offline maps',
          'Learn a few local phrases',
          'Stay hydrated and wear comfortable shoes',
        ],
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
      
      return NextResponse.json(
        {
          error: 'Failed to parse AI response',
          rawText: text,
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in Groq itinerary API:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to generate itinerary', details: errorMessage },
      { status: 500 }
    )
  }
}

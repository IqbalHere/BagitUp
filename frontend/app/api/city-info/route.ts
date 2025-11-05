import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const place = searchParams.get('place') || searchParams.get('destination')

  if (!place) {
    return NextResponse.json({ error: 'Place/destination is required' }, { status: 400 })
  }

  // Mock city data with more comprehensive information
  const cityData = {
    name: place,
    country: 'Country Name',
    continent: 'Continent',
    description: `${place} is a vibrant destination known for its unique blend of culture, history, and modern attractions.`,
    history: `${place} has a rich history spanning centuries. From ancient civilizations to modern-day developments, the city has been shaped by numerous cultural influences and historical events that make it a fascinating destination for history enthusiasts.`,
    famousFor: [
      'Iconic landmarks and architecture',
      'World-class museums and galleries',
      'Vibrant local cuisine and dining scene',
      'Rich cultural heritage and festivals',
      'Shopping and entertainment districts',
    ],
    bestTimeToVisit: 'Spring and Fall are generally the best times to visit',
    weather: {
      summary: 'Temperate climate with distinct seasons',
      spring: 'Mild temperatures, occasional rain (15-20°C / 59-68°F)',
      summer: 'Warm and pleasant (25-30°C / 77-86°F)',
      fall: 'Cool and comfortable (15-22°C / 59-72°F)',
      winter: 'Cold with possible snow (0-10°C / 32-50°F)',
    },
    safety: {
      overall: 'Generally very safe for tourists',
      tips: [
        'Keep valuables secure in crowded areas',
        'Be aware of your surroundings at night',
        'Use official taxis or ride-sharing apps',
        'Keep emergency numbers handy',
      ],
    },
    etiquette: {
      greetings: 'A polite greeting is always appreciated',
      tipping: 'Tipping 10-15% is customary in restaurants',
      dressCode: 'Casual dress is acceptable in most places',
      customs: [
        'Respect local customs and traditions',
        'Ask permission before taking photos of people',
        'Be mindful of noise levels in residential areas',
      ],
    },
    language: {
      primary: 'Local Language',
      english: 'English is widely spoken in tourist areas',
      usefulPhrases: [
        { phrase: 'Hello', translation: 'Hello' },
        { phrase: 'Thank you', translation: 'Thank you' },
        { phrase: 'Please', translation: 'Please' },
        { phrase: 'Excuse me', translation: 'Excuse me' },
      ],
    },
    currency: {
      name: 'Local Currency',
      code: 'XXX',
      symbol: '$',
      exchangeTips: 'Currency exchange available at banks and exchange offices',
    },
    transportation: {
      publicTransit: 'Extensive public transportation network including metro, buses, and trams',
      taxi: 'Taxis and ride-sharing services readily available',
      walking: 'Many areas are pedestrian-friendly',
    },
  }

  return NextResponse.json(cityData)
}

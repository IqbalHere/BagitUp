import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const destination = searchParams.get('destination')
  const days = parseInt(searchParams.get('days') || '3')

  if (!destination) {
    return NextResponse.json({ error: 'Destination is required' }, { status: 400 })
  }

  // Generate itinerary based on number of days
  const generateItinerary = (numDays: number) => {
    const activities = [
      {
        morning: 'Breakfast at local café, explore main square',
        afternoon: 'Visit iconic landmarks and museums',
        evening: 'Dinner at traditional restaurant',
      },
      {
        morning: 'Morning walk through historic district',
        afternoon: 'Shopping at local markets and boutiques',
        evening: 'Sunset viewing at scenic viewpoint',
      },
      {
        morning: 'Visit cultural sites and galleries',
        afternoon: 'Lunch at popular food district, continue sightseeing',
        evening: 'Evening entertainment or local show',
      },
      {
        morning: 'Day trip to nearby attractions',
        afternoon: 'Explore countryside or coastal areas',
        evening: 'Return to city, relaxed evening',
      },
      {
        morning: 'Free time for personal exploration',
        afternoon: 'Visit remaining must-see spots',
        evening: 'Farewell dinner at rooftop restaurant',
      },
    ]

    const itinerary = []
    for (let i = 0; i < Math.min(numDays, 10); i++) {
      const activityIndex = i % activities.length
      itinerary.push({
        day: i + 1,
        title: `Day ${i + 1} in ${destination}`,
        morning: activities[activityIndex].morning,
        afternoon: activities[activityIndex].afternoon,
        evening: activities[activityIndex].evening,
        highlights: [
          'Local cuisine tasting',
          'Photo opportunities',
          'Cultural experiences',
        ],
      })
    }
    return itinerary
  }

  const itinerary = generateItinerary(days)

  return NextResponse.json({
    destination,
    days,
    itinerary,
    tips: [
      'Book attractions in advance to skip lines',
      'Try local transportation for authentic experience',
      'Learn a few key phrases in the local language',
      'Keep flexible - allow time for spontaneous discoveries',
    ],
  })
}

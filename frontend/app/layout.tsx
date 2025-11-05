import type { Metadata, Viewport } from 'next'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/context/AuthContext'
import { TripProvider } from '@/lib/context/TripContext'

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pixel',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'BagItUp - AI-Powered Travel Planner',
  description: 'Plan your trip with AI-powered itineraries, local intelligence, and personalized packing recommendations',
  keywords: ['travel', 'planning', 'packing', 'AI', 'itinerary', 'GPT-4', 'travel planner'],
  authors: [{ name: 'BagItUp Team' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BagItUp',
  },
  openGraph: {
    type: 'website',
    siteName: 'BagItUp',
    title: 'BagItUp - AI-Powered Travel Planner',
    description: 'Plan your trip with AI-powered itineraries and local intelligence',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BagItUp - AI-Powered Travel Planner',
    description: 'Plan your trip with AI-powered itineraries and local intelligence',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export const viewport: Viewport = {
  themeColor: '#016B61',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={pixelFont.className}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Unregister all service workers
              if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister();
                    console.log('Service worker unregistered:', registration);
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body className="antialiased bg-cream text-black">
        <AuthProvider>
          <TripProvider>
            {children}
          </TripProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

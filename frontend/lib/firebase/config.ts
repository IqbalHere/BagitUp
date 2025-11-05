import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getStorage, FirebaseStorage } from 'firebase/storage'

// Validate if real Firebase config is provided
const hasRealFirebaseConfig = () => {
  const required = [
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  ]
  
  const allPresent = required.every(val => val && val.length > 0)
  const noDemoValues = !required.some(val => val?.includes('demo') || val?.includes('123456789'))
  
  return allPresent && noDemoValues
}

const isConfigured = hasRealFirebaseConfig()

if (!isConfigured) {
  console.error(`
╔════════════════════════════════════════════════════════════════╗
║  ⚠️  FIREBASE NOT CONFIGURED                                    ║
╟────────────────────────────────────────────────────────────────╢
║  Please follow these steps:                                    ║
║                                                                ║
║  1. Go to https://console.firebase.google.com/                ║
║  2. Create a new project (or use existing)                    ║
║  3. Enable Authentication → Email/Password & Google           ║
║  4. Register a Web App                                        ║
║  5. Copy the config values to .env.local                      ║
║                                                                ║
║  See FIREBASE_AUTH_SETUP.md for detailed instructions         ║
╚════════════════════════════════════════════════════════════════╝
  `)
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
}

// Initialize Firebase
let app: FirebaseApp
let auth: Auth
let storage: FirebaseStorage | null = null

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
  auth = getAuth(app)
  storage = getStorage(app)
  
  if (isConfigured) {
    console.log('✅ Firebase initialized successfully')
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error)
  throw error
}

export { app, auth, storage, isConfigured as firebaseEnabled }

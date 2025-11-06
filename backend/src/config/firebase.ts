import admin from 'firebase-admin'
import * as fs from 'fs'

let firebaseInitialized = false

try {
  let serviceAccount: admin.ServiceAccount | undefined

  // Try to load from individual env vars first (Render-friendly)
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
    serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }
  }
  // Try to load from path
  else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
    if (fs.existsSync(serviceAccountPath)) {
      serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
    } else {
      console.warn(`⚠️  Firebase service account file not found at: ${serviceAccountPath}`)
    }
  }
  // Try to parse from environment variable
  else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  }

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    firebaseInitialized = true
    console.log('✅ Firebase Admin SDK initialized')
  } else {
    console.warn('⚠️  Firebase Admin SDK not initialized: No service account provided')
    console.warn('   Set FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL')
  }
} catch (error) {
  console.error('❌ Firebase Admin SDK initialization failed:', error)
  console.warn('   Authentication features will be disabled')
}

export { firebaseInitialized }
export default admin

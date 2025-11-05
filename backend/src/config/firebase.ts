import admin from 'firebase-admin'
import * as fs from 'fs'

let firebaseInitialized = false

try {
  let serviceAccount: admin.ServiceAccount | undefined

  // Try to load from path first
  if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
    if (fs.existsSync(serviceAccountPath)) {
      serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
    } else {
      console.warn(`⚠️  Firebase service account file not found at: ${serviceAccountPath}`)
    }
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Parse from environment variable
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
    console.warn('   Authentication features will be disabled until configured')
    console.warn('   Set FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT in .env')
  }
} catch (error) {
  console.error('❌ Firebase Admin SDK initialization failed:', error)
  console.warn('   Authentication features will be disabled')
}

export { firebaseInitialized }
export default admin

import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI = process.env.MONGO_URI

    if (!MONGO_URI) {
      console.warn('⚠️  MONGO_URI is not defined in environment variables')
      console.warn('   Database features will be disabled until configured')
      return
    }

    // Connection options
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    }

    // Disable autoIndex in production for performance
    if (process.env.NODE_ENV === 'production') {
      mongoose.set('autoIndex', false)
    }

    await mongoose.connect(MONGO_URI, options)

    console.log('✅ MongoDB connected successfully')

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected')
    })

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      console.log('MongoDB connection closed due to app termination')
      process.exit(0)
    })
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    console.warn('   Continuing without database. Install and start MongoDB to enable data persistence.')
  }
}

export default connectDB

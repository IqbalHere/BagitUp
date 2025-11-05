// backend/src/index.ts
import 'dotenv/config'         // <--- load env first (equivalent to dotenv.config())
import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './config/database'
import './config/firebase'    // ensure this runs after env is loaded
import routes from './routes'
import { errorHandler } from './middleware/errorHandler'

const app: Application = express()
const PORT = Number(process.env.PORT) || 4000

console.log(`🔍 PORT from env: ${process.env.PORT}, Using: ${PORT}`)

// Connect to MongoDB (connectDB should handle its own errors)
connectDB().catch(err => {
  console.error('❌ Failed to connect to DB on startup:', err)
  // do not exit immediately — your app may want to run with degraded features,
  // but consider process.exit(1) if DB is critical in production.
})

// Middleware
app.use(helmet())

const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
  : 'http://localhost:3000'

app.use(cors({
  origin: corsOrigin,
  credentials: true,
}))

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    name: 'BagitUp Travel API',
    version: '2.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      api: '/api',
      docs: '/api'
    }
  })
})

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api', routes)

// Error handling middleware
app.use(errorHandler)

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
})

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`Received ${signal} — shutting down gracefully`)
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'))
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))

export default app

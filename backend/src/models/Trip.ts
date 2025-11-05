import mongoose, { Schema, Document } from 'mongoose'

export interface ITrip extends Document {
  userId: string
  destination: string
  startDate: Date
  endDate: Date
  duration: number // in days
  preferences: {
    activities?: string[]
    climate?: string
    budget?: 'Budget' | 'Moderate' | 'Luxury' | 'Ultra-Luxury' | 'low' | 'medium' | 'high'
    travelStyle?: string
  }
  recommendations?: mongoose.Types.ObjectId[]
  status: 'planning' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const TripSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    preferences: {
      activities: [String],
      climate: String,
      budget: {
        type: String,
        enum: ['Budget', 'Moderate', 'Luxury', 'Ultra-Luxury', 'low', 'medium', 'high'],
        default: 'Moderate',
      },
      travelStyle: String,
    },
    recommendations: [{
      type: Schema.Types.ObjectId,
      ref: 'Recommendation',
    }],
    status: {
      type: String,
      enum: ['planning', 'confirmed', 'completed', 'cancelled'],
      default: 'planning',
    },
    notes: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ITrip>('Trip', TripSchema)

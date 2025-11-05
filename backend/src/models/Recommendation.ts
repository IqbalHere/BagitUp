import mongoose, { Schema, Document } from 'mongoose'

export interface IRecommendation extends Document {
  tripId: mongoose.Types.ObjectId
  userId: string
  products: Array<{
    productId: mongoose.Types.ObjectId
    reason: string
    priority: 'essential' | 'recommended' | 'optional'
  }>
  aiPrompt: string
  aiResponse: string
  cacheKey?: string
  expiresAt?: Date
  createdAt: Date
  updatedAt: Date
}

const RecommendationSchema: Schema = new Schema(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    products: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      reason: {
        type: String,
        required: true,
      },
      priority: {
        type: String,
        enum: ['essential', 'recommended', 'optional'],
        default: 'recommended',
      },
    }],
    aiPrompt: {
      type: String,
      required: true,
    },
    aiResponse: {
      type: String,
      required: true,
    },
    cacheKey: {
      type: String,
      index: true,
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IRecommendation>('Recommendation', RecommendationSchema)

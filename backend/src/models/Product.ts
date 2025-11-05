import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  description: string
  category: string
  price: number
  currency: string
  affiliateUrl: string
  affiliatePartner?: string
  imageUrl: string
  tags: string[]
  rating?: number
  reviewCount?: number
  inStock: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'luggage',
        'clothing',
        'electronics',
        'accessories',
        'toiletries',
        'outdoor-gear',
        'travel-docs',
        'health-safety',
        'comfort',
        'tech-gadgets',
        'other'
      ],
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    affiliateUrl: {
      type: String,
      required: true,
    },
    affiliatePartner: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

ProductSchema.index({ name: 'text', description: 'text', tags: 'text' })

export default mongoose.model<IProduct>('Product', ProductSchema)

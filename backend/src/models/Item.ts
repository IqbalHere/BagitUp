import mongoose, { Schema, Document } from 'mongoose'

export interface IItem extends Document {
  title: string
  description: string
  category: string
  userId: mongoose.Types.ObjectId
  imageUrl?: string
  tags: string[]
  status: 'active' | 'archived' | 'deleted'
  createdAt: Date
  updatedAt: Date
}

const ItemSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageUrl: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['active', 'archived', 'deleted'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
)

// Compound indexes for efficient queries
ItemSchema.index({ userId: 1, status: 1 })
ItemSchema.index({ category: 1 })

export default mongoose.model<IItem>('Item', ItemSchema)

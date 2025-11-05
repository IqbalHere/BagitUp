import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  firebaseUid: string
  email: string
  displayName?: string
  photoURL?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    displayName: {
      type: String,
      trim: true,
    },
    photoURL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes are created by unique: true above
// Manual indexing only in development if needed
export default mongoose.model<IUser>('User', UserSchema)

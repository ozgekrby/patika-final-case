import mongoose from 'mongoose'
import mongodbConfig from '../config/mongodb.config.js'

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongodbConfig.uri, {})
    console.log('MongoDB connected successfully!')
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  }
}
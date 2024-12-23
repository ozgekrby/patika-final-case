import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { connectMongoDB } from 'ok-backend-common/mongodb/connection.js'
import { errorHandler, notFoundHandler } from 'ok-backend-common/middlewares/error.handler.js'
import { bootstrap } from './src/bootstrap.js'

dotenv.config()

const app = express();

(async () => {
  try {
    await connectMongoDB()
    console.log('Connected to MongoDB successfully')
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
  }
})()

const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000']

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
bootstrap(app)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Payment service is running' })
})

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 3030

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
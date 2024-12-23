import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { connectMongoDB } from 'ok-backend-common/mongodb/connection.js'
import { errorHandler, notFoundHandler } from 'ok-backend-common/middlewares/error.handler.js'
import { bootstrap } from './src/bootstrap.js'
import session from 'express-session'
import { RedisStore } from 'connect-redis'
import redisClient from 'ok-backend-common/utils/redis-client.js'
import { initializeWebSocket } from './src/utils/websocket.js'
import { startCommerceListener } from './src/utils/kafka.js'

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

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 60000 },
  })
)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Ecommerce backend API is running' })
})

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 3010

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  startCommerceListener()
})

initializeWebSocket(server)
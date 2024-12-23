import { createClient } from 'redis'
import redisConfig from '../config/redis.config.js'

const redisClient = createClient({
  url: redisConfig.uri,
})

if (!redisClient.isOpen) {
  await redisClient.connect()
  console.log('Connected to Redis')
}

redisClient.on('error', (err) => {
  console.error('Redis error:', err)
})

redisClient.on('connect', () => {
  console.log('Connected to Redis successfully')
})

export default redisClient
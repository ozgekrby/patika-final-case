import { errorHandler } from 'ok-backend-common/middlewares/error.handler.js'
import { authenticateToken } from 'ok-backend-common/middlewares/auth.middleware.js'

import PaymentRouter from './routes/payment.routes.js'

export function bootstrap (app) {

  app.use('/api/payments', authenticateToken, PaymentRouter)

  app.use(errorHandler)
}

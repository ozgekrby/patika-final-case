import { errorHandler } from 'ok-backend-common/middlewares/error.handler.js'
import { authenticateToken, authorizeRoles } from 'ok-backend-common/middlewares/auth.middleware.js'

import InvoiceRouter from './routes/invoice.routes.js'

export function bootstrap (app) {

  app.use('/api/invoices', authenticateToken, InvoiceRouter)

  app.use(errorHandler)
}

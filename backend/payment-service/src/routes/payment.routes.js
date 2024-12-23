import express from 'express'
import * as paymentController from '../controllers/payment.controller.js'

import { checkPaymentExists, validateRequest, } from '../middlewares/validate-request.js'

import {
  createPaymentRequestValidation,
  orderPaymentsRequestValidation,
  detailPaymentRequestValidation,
} from '../validation/payment.validation.js'
import { authorizeRoles } from 'ok-backend-common/middlewares/index.js'
import ROLES from 'ok-backend-common/constants/roles.js'

const PaymentRouter = express.Router()

PaymentRouter.get('/',
  authorizeRoles(ROLES.ADMIN),
  paymentController.index
)

PaymentRouter.get('/by-order/:orderId',
  authorizeRoles(ROLES.ADMIN),
  validateRequest(orderPaymentsRequestValidation),
  paymentController.byOrder
)

PaymentRouter.post('/create',
  validateRequest(createPaymentRequestValidation),
  paymentController.create
)

PaymentRouter.get('/detail/:id',
  validateRequest(detailPaymentRequestValidation),
  checkPaymentExists,
  paymentController.detail
)

export default PaymentRouter
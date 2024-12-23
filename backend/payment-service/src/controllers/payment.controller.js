import { catchAsyncError } from 'ok-backend-common/utils/catch-async-error.js'
import { getCommerceUserOrder } from 'ok-backend-common/utils/api/commerce.js'
import * as PaymentService from '../services/payment.service.js'

const index = catchAsyncError(async (req, res, next) => {
  const payments = await PaymentService.findAll()
  res.status(200).json({
    success: true,
    data: {
      payments
    }
  })
})

const byOrder = catchAsyncError(async (req, res, next) => {
  const order = await getCommerceUserOrder(req.token, req.params.orderId);
  const payments = await PaymentService.findByOrder(order)
  res.status(200).json({
    success: true,
    data: {
      payments
    }
  })
})

const create = catchAsyncError(async (req, res, next) => {
  const order = await getCommerceUserOrder(req.token, req.body.orderId);
  const payment = await PaymentService.create(order)
  res.status(200).json({
    success: true,
    data: {
      payment
    }
  })
})

const detail = catchAsyncError(async (req, res, next) => {
  const payment = req.foundPayment;
  res.status(200).json({
    success: true,
    data: {
      payment
    }
  })
})

export {
  index,
  byOrder,
  create,
  detail,
}
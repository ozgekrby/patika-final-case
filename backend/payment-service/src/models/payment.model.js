import { Schema, model } from 'mongoose'
import {
  PAYMENT_STATES,
} from 'ok-backend-common/constants/states.js'

const PaymentSchema = new Schema({
  orderId: {
    type: String,
    required: true
  },
  paymentIntentId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'usd'
  },
  state: {
    type: String,
    enum: [
      PAYMENT_STATES.PENDING,
      PAYMENT_STATES.PROCESSING,
      PAYMENT_STATES.FULLFILLED,
      PAYMENT_STATES.FAILED,
      PAYMENT_STATES.CANCELLED,
      PAYMENT_STATES.REFUNDED,
    ],
    default: PAYMENT_STATES.PENDING
  },
}, {
  timestamps: true
})

const Payment = model('payment', PaymentSchema)

export default Payment
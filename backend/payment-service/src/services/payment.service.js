import Payment from '../models/payment.model.js'
import { PAYMENT_STATES } from 'ok-backend-common/constants/states.js'
import { kafkaClient } from '../utils/kafka.js'

const findById = async (id) => {
  return Payment.findById(id)
}

const findAll = async () => {
  return Payment.find()
}

const findByOrder = async (order) => {
  return Payment.find({ orderId: order._id })
}

const create = async (order) => {

  try {

    let paymentIntent = {}

    const data = {
      orderId: order._id,
      paymentIntentId: paymentIntent?.id ?? 'xxx',
      amount: order.total,
      currency: 'usd',
      state: PAYMENT_STATES.FULLFILLED,
    }

    const payment = await Payment.create(data)

    const message = {
      type: 'payment',
      id: payment._id,
      orderId: payment.orderId,
      paymentIntentId: payment.paymentIntentId,
      amount: payment.amount,
      currency: payment.currency,
      state: payment.state,
    }

    try {
      await kafkaClient.sendMessage('commerce-topic', message);
    } catch (error) {
      console.error('Error sending message to commerce:', error);
    }

    try {
      await kafkaClient.sendMessage('invoice-topic', message);
    } catch (error) {
      console.error('Error sending message to invoice:', error);
    }

    return payment

  } catch (error) {
    throw error
  }
}

export {
  findById,
  findAll,
  findByOrder,
  create,
}
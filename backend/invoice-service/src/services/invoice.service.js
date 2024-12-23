import Invoice from '../models/invoice.model.js'
import { INVOICE_STATES } from 'ok-backend-common/constants/states.js'
import { kafkaClient } from '../utils/kafka.js'
import { generateInvoiceNumber } from 'ok-backend-common/utils/string.js'

const findById = async (id) => {
  return Invoice.findById(id)
}

const findAll = async () => {
  return Invoice.find()
}

const findByOrder = async (order) => {
  return Invoice.find({ orderId: order._id })
}

const findByPayment = async (payment) => {
  return Invoice.find({ paymentId: payment._id })
}

const createByPayment = async (payment) => {
  try {

    const data = {
      number: generateInvoiceNumber(),
      orderId: payment.orderId,
      paymentId: payment.id,
      total: payment.amount,
      state: INVOICE_STATES.CREATED,
      file: `invoice-${payment.orderId}-${payment.id}.pdf`
    }

    const invoice = await Invoice.create(data);

    const message = {
      type: 'invoice',
      id: invoice._id,
      number: invoice.number,
      orderId: invoice.orderId,
      paymentId: invoice.paymentId,
      state: invoice.state,
    }

    await kafkaClient.sendMessage('commerce-topic', message);

    return invoice;

  } catch (error) {
    throw error
  }
}

export {
  findById,
  findAll,
  findByOrder,
  findByPayment,
  createByPayment,
}
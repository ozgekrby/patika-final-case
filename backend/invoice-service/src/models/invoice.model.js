import { Schema, model } from 'mongoose'
import {
  INVOICE_STATES,
} from 'ok-backend-common/constants/states.js';

const InvoiceSchema = new Schema({
    number: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: String,
      required: true
    },
    paymentId: {
      type: String,
      required: true
    },
    file: {
      type: String,
      required: true
    },
    state: {
      type: String,
      enum: [
        INVOICE_STATES.PENDING,
        INVOICE_STATES.CREATED,
        INVOICE_STATES.SENT,
        INVOICE_STATES.CANCELLED,
      ],
      default: INVOICE_STATES.PENDING
    },
  }, {
    timestamps: true
  }
)

const Invoice = model('invoice', InvoiceSchema)

export default Invoice
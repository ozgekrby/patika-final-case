import { Schema, model } from "mongoose";
import {
  ORDER_STATES,
  PAYMENT_STATES,
  INVOICE_STATES,
} from "ok-backend-common/constants/states.js";

const OrderSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: { type: Schema.ObjectId, ref: "product" },
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
        productDiscount: Number,
      },
    ],
    billingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    state: {
      type: String,
      enum: [
        ORDER_STATES.NEW,
        ORDER_STATES.PAYMENT_PROCESSING,
        ORDER_STATES.PAID,
        ORDER_STATES.FULLFILLED,
        ORDER_STATES.CANCELLED,
        ORDER_STATES.RETURNED,
      ],
      default: ORDER_STATES.NEW,
    },
    paymentState: {
      type: String,
      enum: [
        PAYMENT_STATES.PENDING,
        PAYMENT_STATES.PROCESSING,
        PAYMENT_STATES.FULLFILLED,
        PAYMENT_STATES.FAILED,
        PAYMENT_STATES.CANCELLED,
        PAYMENT_STATES.REFUNDED,
      ],
      default: PAYMENT_STATES.PENDING,
    },
    invoiceState: {
      type: String,
      enum: [
        INVOICE_STATES.PENDING,
        INVOICE_STATES.CREATED,
        INVOICE_STATES.SENT,
        INVOICE_STATES.CANCELLED,
      ],
      default: INVOICE_STATES.PENDING,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("order", OrderSchema);

export default Order;

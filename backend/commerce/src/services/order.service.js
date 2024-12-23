import Order from "../models/order.model.js";
import { kafkaClient } from "../utils/kafka.js";

import { sendWebSocketNotification } from "../utils/websocket.js";

const findById = async (id) => {
  return Order.findById(id);
};

const findAll = async () => {
  return Order.find().select("-password");
};

const findByUser = async (user) => {
  return Order.find({ user: user });
};

const create = async (data) => {
  try {
    const order = await Order.create(data);
    sendWebSocketNotification({ event: "order_created", order });

    await kafkaClient.sendMessage("order-topic", JSON.stringify(order));

    return order;
  } catch (error) {
    throw error;
  }
};

const update = async (order, data) => {
  try {
    const previousState = order.state;
    const previousPaymentState = order.paymentState;
    const previousInvoiceState = order.invoiceState;

    Object.assign(order, data);
    const updatedOrder = await order.save();

    if (previousState !== updatedOrder.state) {
      if (
        ["PAID", "FULLFILLED", "CANCELLED", "RETURNED"].includes(
          updatedOrder.state
        )
      ) {
        sendWebSocketNotification({
          event: `order_${updatedOrder.state.toLowerCase()}`,
          order: updatedOrder,
        });
      }
    }

    if (previousPaymentState !== updatedOrder.paymentState) {
      if (updatedOrder.paymentState === "FAILED") {
        sendWebSocketNotification({
          event: "payment_failed",
          order: updatedOrder,
        });
      }
    }

    if (previousInvoiceState !== updatedOrder.invoiceState) {
      if (["CREATED", "SENT"].includes(updatedOrder.invoiceState)) {
        sendWebSocketNotification({
          event: `invoice_${updatedOrder.invoiceState.toLowerCase()}`,
          order: updatedOrder,
        });
      }
    }

    return updatedOrder;
  } catch (error) {
    throw error;
  }
};

export { findById, findAll, findByUser, create, update };

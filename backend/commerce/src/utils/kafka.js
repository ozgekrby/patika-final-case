import { createKafkaClient } from "ok-backend-common/utils/kafka.js";
import * as OrderService from "../services/order.service.js";

const kafkaClient = createKafkaClient("commerce-service", "commerce-group");

const processCommerceMessage = async (message) => {
  console.log("Processing commerce message:", message.value.toString());

  const data = JSON.parse(message.value.toString());

  if (data.type === "invoice") {
    try {
      const order = await OrderService.findById(data.orderId);
      if (data.state !== order.invoiceState) {
        await OrderService.update(order, { invoiceState: data.state });
      }
    } catch (error) {
      console.error("Error processing invoice message:", error);
    }
  }

  if (data.type === "payment") {
    try {
      const payment = JSON.parse(message.value.toString());
      const order = await OrderService.findById(payment.orderId);
      if (payment.state !== order.paymentState) {
        await OrderService.update(order, { paymentState: payment.state });
      }
    } catch (error) {
      console.error("Error processing payment message:", error);
    }
  }
};

const startCommerceListener = async () => {
  await kafkaClient.consumeMessages("commerce-topic", processCommerceMessage);
};

export { startCommerceListener, kafkaClient };

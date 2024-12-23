import { createKafkaClient } from 'ok-backend-common/utils/kafka.js';
import { PAYMENT_STATES } from 'ok-backend-common/constants/states.js'
import * as InvoiceService from '../services/invoice.service.js'

const kafkaClient = createKafkaClient('invoice-service', 'invoice-group');

const processInvoiceMessage = async (message) => {
  console.log('Processing invoice message:', message.value.toString());

  try {
    const payment = JSON.parse(message.value.toString());
    if (payment.state === PAYMENT_STATES.FULLFILLED) {
      await InvoiceService.createByPayment(payment);
    }
  } catch (error) {
    console.error('Error processing payment message:', error);
  }

};

const startInvoiceListener = async () => {
  await kafkaClient.consumeMessages('invoice-topic', processInvoiceMessage);
};

export { startInvoiceListener, kafkaClient };
import { createKafkaClient } from 'ok-backend-common/utils/kafka.js';

const kafkaClient = createKafkaClient('payment-service', 'payment-group');

export { kafkaClient };
import { Kafka } from 'kafkajs';

const createKafkaClient = (clientId, groupId) => {
  const kafka = new Kafka({
    clientId,
    brokers: [process.env.KAFKA_BROKER],
    retry: {
      initialRetryTime: 300,
      retries: 10
    }
  });

  const producer = kafka.producer();
  let isProducerConnected = false;

  const connectProducer = async () => {
    try {
      if (!isProducerConnected) {
        await producer.connect();
        isProducerConnected = true;
      }
    } catch (error) {
      console.error('Producer connection error:', error);
    }
  };

  const sendMessage = async (topic, message) => {
    try {
      await connectProducer();
      await producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      console.error(`Error sending message to topic ${topic}:`, error);
    }
  };

  const consumer = kafka.consumer({ groupId });

  const consumeMessages = async (topic, processMessage) => {
    try {
      await consumer.connect();
      await consumer.subscribe({ topic, fromBeginning: true });
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log(`Message received on topic ${topic}:`, message.value.toString());
          await processMessage(message);
        },
      });
    } catch (error) {
      console.error(`Error consuming messages from topic ${topic}:`, error);
    }
  };

  return {
    sendMessage,
    consumeMessages,
  };
};

export { createKafkaClient };
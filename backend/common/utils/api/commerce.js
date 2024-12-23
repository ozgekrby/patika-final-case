import { createCommerceHttpClient } from './client.js';

const getCommerceUserOrder = async (token, orderId) => {

  const response = await createCommerceHttpClient(token).get(`/orders/${orderId}`);

  if (response.data.success) {
    return response.data.data.order;
  }

  return null;
};

export {
  getCommerceUserOrder,
}
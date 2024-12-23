import axios from 'axios';

const createHttpClient = (baseURL, token) => {
  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const createCommerceHttpClient = (token) => {
  const baseURL = process.env.COMMERCE_API_URL || 'http://localhost:3010/api';
  return createHttpClient(baseURL, token);
};

const createInvoiceServiceHttpClient = (token) => {
  const baseURL = process.env.INVOICE_SERVICE_API_URL || 'http://localhost:3020/api';
  return createHttpClient(baseURL, token);
};

const createPaymentServiceHttpClient = (token) => {
  const baseURL = process.env.PAYMENT_SERVICE_API_URL || 'http://localhost:3030/api';
  return createHttpClient(baseURL, token);
};

export {
  createHttpClient,
  createCommerceHttpClient,
  createInvoiceServiceHttpClient,
  createPaymentServiceHttpClient,
}
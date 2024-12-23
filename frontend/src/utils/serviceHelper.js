import Cookies from 'js-cookie';

const BASE_URLS = {
  commerce: import.meta.env.VITE_COMMERCE_API,
  invoice: import.meta.env.VITE_INVOICE_API,
  payment: import.meta.env.VITE_PAYMENT_API,
};

export const getAuthToken = () => {
  return Cookies.get('authToken');
};

const fetchHelper = async (api, endpoint, options = {}) => {
  const url = `${BASE_URLS[api]}${endpoint}`;
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    let errorMessage = 'Bilinmeyen bir hata oluştu';
    if (errorData.error) {
      switch (errorData.error.code) {
        case 'ACCOUNT_NOT_FOUND':
          errorMessage = 'Hesap bulunamadı!';
          break;
        case 'ACCOUNT_EXISTS':
          errorMessage = 'Hesap zaten mevcut!';
          break;
        case 'INVALID_CREDENTIALS':
          errorMessage = 'Geçersiz kimlik bilgileri!';
          break;
        case 'INVALID_REQUEST':
          errorMessage = 'Geçersiz istek!';
          break;
        case 'NOT_FOUND':
          errorMessage = 'Bulunamadı!';
          break;
        case 'ACCESS_DENIED':
          errorMessage = 'Erişim reddedildi!';
          break;
        case 'INVALID_ACCESS_TOKEN':
          errorMessage = 'Geçersiz erişim tokenı!';
          window.location.href = '/login';
          break;
        case 'ACCESS_TOKEN_MISSING':
          errorMessage = 'Erişim tokenı eksik!';
          break;
        case 'SERVER_ERROR':
          errorMessage = 'Sunucu hatası, lütfen daha sonra tekrar deneyin!';
          break;
        default:
          errorMessage = errorData.error.message || errorMessage;
      }
      throw new Error(errorMessage);
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const commerceService = (endpoint, options) => fetchHelper('commerce', endpoint, options);
export const invoiceService = (endpoint, options) => fetchHelper('invoice', endpoint, options);
export const paymentService = (endpoint, options) => fetchHelper('payment', endpoint, options);
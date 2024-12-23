const ORDER_STATES_TR = {
  NEW: 'Yeni',
  PAYMENT_PROCESSING: 'Ödeme İşleniyor',
  PAID: 'Ödendi',
  FULLFILLED: 'Tamamlandı',
  CANCELLED: 'İptal Edildi',
  RETURNED: 'İade Edildi',
};

const PAYMENT_STATES_TR = {
  PENDING: 'Beklemede',
  PROCESSING: 'İşleniyor',
  FULLFILLED: 'Tamamlandı',
  FAILED: 'Başarısız',
  CANCELLED: 'İptal Edildi',
  REFUNDED: 'İade Edildi',
};

const INVOICE_STATES_TR = {
  PENDING: 'Beklemede',
  CREATED: 'Oluşturuldu',
  SENT: 'Gönderildi',
  CANCELLED: 'İptal Edildi',
};

export {
  ORDER_STATES_TR,
  PAYMENT_STATES_TR,
  INVOICE_STATES_TR,
};
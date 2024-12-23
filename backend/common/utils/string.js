const generateOrderNumber = () => {
  return `OK-ORD-${Math.random().toString(36).substring(2, 16).toUpperCase()}`;
}

const generateInvoiceNumber = () => {
  return `OK-INV-${Math.random().toString(36).substring(2, 16).toUpperCase()}`;
}

export {
  generateOrderNumber,
  generateInvoiceNumber
}
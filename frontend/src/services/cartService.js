import { commerceService } from '../utils/serviceHelper.js'

export const getCartRequest = async () => {

  const response = await commerceService('/cart')

  if (response.success && response.data.cart) {
    return response.data.cart
  }

  return null;
}

export const addCartItemRequest = async (product, quantity) => {

  const response = await commerceService('/cart/add', {
    method: 'POST',
    body: JSON.stringify({ product, quantity }),
  })

  if (response.success && response.data.cart) {
    return response.data.cart
  }

  return null;
}

export const removeCartItemRequest = async (productId) => {

  const response = await commerceService(`/cart/remove/${productId}`, {
    method: 'DELETE',
  })

  return !!response.success;
}

export const clearCartRequest = async () => {

  const response = await commerceService('/cart/clear', {
    method: 'DELETE',
  })

  return !!response.success;
}
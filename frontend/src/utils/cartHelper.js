import { commerceService } from './serviceHelper.js'

export const getCart = async () => {
  try {
    const response = await commerceService('/cart')
    if (response.success) {
      return response.data.cart
    } else {
      throw new Error('Sepet verileri alınamadı')
    }
  } catch (error) {
    throw new Error('Sepet verileri alınırken bir hata oluştu')
  }
}
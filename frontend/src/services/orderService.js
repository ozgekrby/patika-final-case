import { commerceService } from '../utils/serviceHelper.js'

export const getOrders = async () => {
  try {
    const response = await commerceService(`/orders`)
    if (response.success) {
      return response.data.orders
    }
    return []
  } catch (error) {
    console.error('Sipariş alma sırasında bir hata oluştu:', error)
    return []
  }
}
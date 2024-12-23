import { commerceService } from '../utils/serviceHelper.js'

export const searchProducts = async (q, category, sort) => {
  try {
    const response = await commerceService(`/products/search?q=${q}`)
    if (response.success) {
      return response.data.products
    }
    return []
  } catch (error) {
    console.error('Ürün araması sırasında bir hata oluştu:', error)
    return []
  }
}
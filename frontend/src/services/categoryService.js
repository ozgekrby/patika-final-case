import { commerceService } from '../utils/serviceHelper.js'

export const getBySlug = async (slug) => {
  try {
    const response = await commerceService(`/categories/${slug}`)
    if (response.success) {
      return response.data.category
    }
    return null
  } catch (error) {
    console.error('Kategori araması sırasında bir hata oluştu:', error)
    return null
  }
}
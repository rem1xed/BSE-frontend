import { api } from './api'

export const advertisementService = {
  // Створити оголошення
  createAdvertisement: async (data) => {
    const response = await api.post('/advertisement/create', data, {
      withCredentials: true,
      // НЕ вказуй Content-Type! Axios сам поставить multipart/form-data для FormData
    })
    return response.data
  },

  // Отримати всі оголошення з фільтрами та пагінацією
  getAdvertisements: async (params = {}) => {
    const response = await api.get('/admin/get/ads', {
      params,
      withCredentials: true,
    })
    return response.data
  },

  getAdvertisementsAmount: async (id) => {
    const response = await api.get(`/advertisement/adsCount/${id}`);
    return response;
  },

  generateLink: async (id, link) => {
    const response = await api.post(`/meet/generatelink/${id}`, {AdLink: link}, {withCredentials: true});
    return response;
  },

  // Отримати оголошення за slug
  getAdvertisementBySlug: async (slug) => {
    const response = await api.get(`/advertisement/${slug}`);
    return response.data
  },

  // Отримати оголошення поточного користувача
  getUserAdvertisements: async (params = {}) => {
    const response = await api.get('/advertisement/user/my', {
      params,
      withCredentials: true,
    })
    return response.data
  },

  // Отримати рекомендовані оголошення
  getRecommendedAdvertisements: async (slug, limit = 6) => {
    const response = await api.get(`/advertisement/recommended/${slug}`, {
      params: { limit },
      withCredentials: true,
    })
    return response.data
  },

  // Оновити оголошення
  updateAdvertisement: async (id, data) => {
    const response = await api.put(`/advertisement/${id}`, data, {
      withCredentials: true,
    })
    return response.data
  },

  // Видалити оголошення
  deleteAdvertisement: async (id) => {
    const response = await api.delete(`/advertisement/${id}`, {
      withCredentials: true,
    })
    return response.data
  },

  // Змінити статус оголошення
  changeAdvertisementStatus: async (id, status) => {
    const response = await api.patch(`/advertisement/${id}/status`, { status }, {
      withCredentials: true,
    })
    return response.data
  },

  // Додати в обране
  addToFavorites: async (advertisementId) => {
    const response = await api.post(`/favorites/${advertisementId}`, {}, {
      withCredentials: true,
    })
    return response.data
  },

  // Видалити з обраного
  removeFromFavorites: async (advertisementId) => {
    const response = await api.delete(`/favorites/${advertisementId}`, {
      withCredentials: true,
    })
    return response.data
  },

  isFavorite: async (advertisementId) => {
    const response = await api.get(`/favorites/${advertisementId}/is-favorite`, {
      withCredentials: true,
    })
    return response.data
  },

  // Отримати обрані оголошення користувача
  getFavoriteAdvertisements: async (params = {}) => {
    const response = await api.get('/advertisement/favorites', {
      params,
      withCredentials: true,
    })
    return response.data
  },

  // Збільшити кількість переглядів           //FINISH ON BACKEND
  // incrementViews: async (slug) => {
  //   const response = await api.post(`/advertisement/${slug}/view`, {}, {
  //     withCredentials: true,
  //   })
  //   return response.data
  // },

  // Отримати статистику оголошення
  getAdvertisementStats: async (id) => {
    const response = await api.get(`/advertisement/${id}/stats`, {
      withCredentials: true,
    })
    return response.data
  },

  // Пошук оголошень
  searchAdvertisements: async (query, params = {}) => {
    const response = await api.get('/advertisement/search', {
      params: { q: query, ...params },
      withCredentials: true,
    })
    return response.data
  },

  // Отримати оголошення за категорією
  getAdvertisementsByCategory: async (category, params = {}) => {
    const response = await api.get(`/advertisement/category/${category}`, {
      params,
      withCredentials: true,
    })
    return response.data
  },

  // Отримати оголошення за локацією
  getAdvertisementsByLocation: async (location, params = {}) => {
    const response = await api.get(`/advertisement/location/${encodeURIComponent(location)}`, {
      params,
      withCredentials: true,
    })
    return response.data
  },

  // Отримати популярні оголошення
  getPopularAdvertisements: async (params = {}) => {
    const response = await api.get('/advertisement/popular', {
      params,
      withCredentials: true,
    })
    return response.data
  },

  // Отримати нові оголошення
  getLatestAdvertisements: async (params = {}) => {
    const response = await api.get('/advertisement/latest', {
      params,
      withCredentials: true,
    })
    return response.data
  },

  // Отримати категорії з кількістю оголошень
  getCategoriesWithCount: async () => {
    const response = await api.get('/advertisement/categories/count', {
      withCredentials: true,
    })
    return response.data
  },

  // Отримати локації з кількістю оголошень
  getLocationsWithCount: async () => {
    const response = await api.get('/advertisement/locations/count', {
      withCredentials: true,
    })
    return response.data
  },

  // Отримати схожі оголошення
  getSimilarAdvertisements: async (slug, limit = 6) => {
    const response = await api.get(`/advertisement/${slug}/similar`, {
      params: { limit },
      withCredentials: true,
    })
    return response.data
  },

  // Підняти оголошення (promote)
  promoteAdvertisement: async (id, days = 7) => {
    const response = await api.post(`/advertisement/${id}/promote`, { days }, {
      withCredentials: true,
    })
    return response.data
  },

  // Поскаржитися на оголошення
  reportAdvertisement: async (id, reason, description = '') => {
    const response = await api.post(`/advertisement/${id}/report`, {
      reason,
      description,
    }, {
      withCredentials: true,
    })
    return response.data
  },

  // Отримати фільтри для пошуку
  getSearchFilters: async () => {
    const response = await api.get('/advertisement/filters', {
      withCredentials: true,
    })
    return response.data
  },

  // Експорт даних користувача
  exportUserAdvertisements: async (format = 'json') => {
    const response = await api.get('/advertisement/user/export', {
      params: { format },
      withCredentials: true,
      responseType: format === 'pdf' || format === 'excel' ? 'blob' : 'json',
    })
    return response.data
  },

  // Bulk операції (для адміністраторів)
  bulkUpdateAdvertisements: async (ids, updateData) => {
    const response = await api.patch('/advertisement/bulk/update', {
      ids,
      updateData,
    }, {
      withCredentials: true,
    })
    return response.data
  },

  bulkDeleteAdvertisements: async (ids) => {
    const response = await api.delete('/advertisement/bulk/delete', {
      data: { ids },
      withCredentials: true,
    })
    return response.data
  },

  // Отримати архівовані оголошення користувача
  getArchivedAdvertisements: async (params = {}) => {
    const response = await api.get('/advertisement/user/archived', {
      params,
      withCredentials: true,
    })
    return response.data
  },

  // Архівувати оголошення
  archiveAdvertisement: async (id) => {
    const response = await api.patch(`/advertisement/${id}/archive`, {}, {
      withCredentials: true,
    })
    return response.data
  },

  // Відновити з архіву
  unarchiveAdvertisement: async (id) => {
    const response = await api.patch(`/advertisement/${id}/unarchive`, {}, {
      withCredentials: true,
    })
    return response.data
  },



  addUsercomplaint: async (id, dto) => {
    const response = await api.post(`/usercomplaints/${id}`, {dto}, {
      withCredentials: true,
    })
    return response.data
  },

  deleteUsercomplaint: async (id) => {
    const response = await api.delete(`/usercomplaints/${id}`, {}, {
      withCredentials: true,
    })
    return response.data
  },

  getAllUsercomplaint: async (id) => {
    const response = await api.get(`/admin/get/usercomp`, {}, {
      withCredentials: true,
    })
    return response.data
  },



  addAdvertisementcomplaint: async (id, dto) => {
    const response = await api.post(`/advertisementcomplaints/${id}`, {dto}, {
      withCredentials: true,
    })
    return response.data
  },

  deleteAdvertisementcomplaint: async (id) => {
    const response = await api.delete(`/advertisementcomplaints/${id}`, {}, {
      withCredentials: true,
    })
    return response.data
  },

  getAllAdvertisementcomplaint: async (id) => {
    const response = await api.get(`/admin/get/adcomp`, {}, {
      withCredentials: true,
    })
    return response.data
  },
}
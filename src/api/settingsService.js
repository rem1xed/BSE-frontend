// settingsService.js
import { api, AUTH_TOKEN_KEY } from "./api";
import { getCookie } from "./cookie";

const getAuthToken = () => getCookie(AUTH_TOKEN_KEY);

// Додавання токена до кожного запиту
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const settings = {
  save_targeting_parameters: async (formData) => {
    try {
      const response = await api.patch('/user/settings', formData);
      return response.data;
    } catch (error) {
      console.error('Помилка збереження параметрів:', error);
      throw error;
    }
  },

  get_targeting_parameters: async () => {
    try {
      const response = await api.get("/user/settings");
      return response.data;
    } catch (error) {
      console.error('Помилка отримання параметрів:', error);
      return {
        age: '',
        country: '',
        region: '',
        city: '',
        interests: [],
        profession: '',
        industry: '',
        educationLevel: '',
        educationInstitution: '',
        socialNetwork: '',
        instagramLink: '',
        facebookLink: '',
      };
    }
  }
};

export { settings };

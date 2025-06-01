// settingsService.js
import { api, AUTH_TOKEN_KEY } from "./api";
import { getCookie } from "./cookie";

const getAuthToken = () => getCookie(AUTH_TOKEN_KEY);

const settings = {
  save_targeting_parameters: async (formData) => {
    try {
      const response = await api.patch('/user/settings', formData, {withCredentials: true});
      return response.data;
    } catch (error) {
      console.error('Помилка збереження параметрів:', error);
      throw error;
    }
  },

  get_targeting_parameters: async () => {
    try {
      const response = await api.get("/user/settings", {withCredentials: true});
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

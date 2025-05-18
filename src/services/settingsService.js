import {api, AUTH_TOKEN_KEY} from "./api"

const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const settings = {
  save_targeting_parameters: async (formData) => {
    try {
      // Simply pass through the formData without modifying the age field
      const response = await api.patch('/user/settings', formData);
      return response.data;
    } catch (error) {
      console.error('Error saving targeting parameters:', error);
      throw error;
    }
  },

  get_targeting_parameters: async () => {
    try {
      const response = await api.get("/user/settings");
      return response.data;
    } catch (error) {
      console.error('Error getting targeting parameters:', error);
      // Return default empty values in case of error
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

export {settings};
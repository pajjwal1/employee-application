import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const email = localStorage.getItem("auth_email");
    const password = localStorage.getItem("auth_password");

    if (email && password) {
      const credentials = btoa(`${email}:${password}`);
      config.headers.Authorization = `Basic ${credentials}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

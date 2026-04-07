import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
     baseURL: apiUrl
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get JWT from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // attach to every request
  }
  return config;
});



export default api;
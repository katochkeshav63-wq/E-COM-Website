import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api"
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get JWT from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // attach to every request
  }
  return config;
});



export default api;
import axios from "axios";

const api = axios.create({
    baseURL: "https://e-com-website-3.onrender.com/api"
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get JWT from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // attach to every request
  }
  return config;
});



export default api;
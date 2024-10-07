import axios from "axios";

const DataService = axios.create({
  baseURL: "http://localhost:4000/api",
});

DataService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default DataService;

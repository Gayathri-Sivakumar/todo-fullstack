import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

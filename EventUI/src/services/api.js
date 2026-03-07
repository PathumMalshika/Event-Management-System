import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8085", // your spring boot service
});

export default api;
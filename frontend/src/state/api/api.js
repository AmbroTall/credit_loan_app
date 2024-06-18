import axios from "axios";

// export const API_URL = "http://localhost:4000";
export const API_URL = "http://144.76.112.25:4000";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: API_URL,
});

export default api;

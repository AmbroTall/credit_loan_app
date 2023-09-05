import axios from "axios";

// export const API_URL = "http://localhost:4000";
export const API_URL = "http://client1.jewelercart.com:4000";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: API_URL,
});

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://sms-dbms-api.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

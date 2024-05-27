import axios from "axios";
const BASE_URL = "http://localhost:3003/api";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;

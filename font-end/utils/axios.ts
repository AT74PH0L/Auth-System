// lib/axiosInstance.js
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // ใช้ตัวแปรจาก .env.local
console.log(process.env);
const axiosInstant = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default axiosInstant;

import axios from "axios";
import { applyAuthInterceptors, applyInterceptors } from "./interceptors";

export const authRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
applyAuthInterceptors(authRequest);

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
applyInterceptors(request);

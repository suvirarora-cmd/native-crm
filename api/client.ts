import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

const getAsyncStorage = () => {
  if (typeof AsyncStorage !== "undefined" && AsyncStorage !== null) {
    return AsyncStorage;
  }
  if (Platform.OS === "web") {
    return {
      setItem: async (key: string, value: string) =>
        localStorage.setItem(key, value),
      getItem: async (key: string) => localStorage.getItem(key),
      removeItem: async (key: string) => localStorage.removeItem(key),
    };
  }
  return AsyncStorage;
};

const storageManager = getAsyncStorage();

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

client.interceptors.request.use(
  async (config) => {
    try {
      const token = await storageManager.getItem("authToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error attaching token", error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  },
);
export const setTokenInStorage = async (token: string) => {
  await storageManager.setItem("authToken", token);
};

export const getTokenFromStorage = async () => {
  return await storageManager.getItem("authToken");
};

export const clearTokenFromStorage = async () => {
  await storageManager.removeItem("authToken");
};

export default client;

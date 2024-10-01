import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import _get from "lodash/get";
import toast from "react-hot-toast";

const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.set("Content-Type", "application/json");
  // console.info("request API ", `${config.baseURL}${config.url}`);
  return config;
};

const requestAuthInterceptor = async (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.set("Authorization", accessToken);
  }
  config.headers.set("Content-Type", "application/json");
  // console.info("request API ", `${config.baseURL}${config.url}`);
  return config;
};

const handleErrorInterceptor = (error: TErrorResponse | AxiosError) => {
  let messageServer = _get(error, "response.data.error.message", "");
  if (messageServer === "") {
    messageServer = _get(error, "response.data", "") as string;
  }
  const codeServer = _get(error, "response.data.error.code", 0);
  const messageAxios = _get(error, "message", "");
  const codeAxios = _get(error, "code", "");

  if (codeServer && codeServer === 401 && messageServer.includes("expired")) {
    toast.error("Token expired, please login again");
    localStorage.removeItem("accessToken");
  } else {
    if (codeAxios && codeAxios === "ERR_NETWORK") {
      toast.error(messageAxios);
    } else {
      toast.error(messageServer);
    }
  }

  return Promise.reject(error);
};

export const applyInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    responseInterceptor,
    handleErrorInterceptor
  );
  axiosInstance.interceptors.request.use(requestInterceptor);
};

export const applyAuthInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    responseInterceptor,
    handleErrorInterceptor
  );
  axiosInstance.interceptors.request.use(requestAuthInterceptor);
};

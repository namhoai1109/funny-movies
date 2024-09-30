import { AxiosResponse } from "axios";
import { request } from "../axios";
import { LOGIN_PATH, REGISTER_PATH } from "./paths";

export const register = async (data: TCredentialRequest) => {
  return request.post<
    TTokenResponse,
    AxiosResponse<TTokenResponse>,
    TCredentialRequest
  >(REGISTER_PATH, data);
};

export const login = async (data: TCredentialRequest) => {
  return request.post<
    TTokenResponse,
    AxiosResponse<TTokenResponse>,
    TCredentialRequest
  >(LOGIN_PATH, data);
};

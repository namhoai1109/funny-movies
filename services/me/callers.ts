import { AxiosResponse } from "axios";
import { authRequest } from "../axios";
import { ME_PATH } from "./paths";

export const getMe = async () => {
  const access_token = localStorage.getItem("accessToken");
  if (!access_token) {
    return {
      data: {
        id: 0,
        email: "",
      },
    } as AxiosResponse<TUserResponse>;
  }

  return authRequest.get<TUserResponse, AxiosResponse<TUserResponse>>(ME_PATH);
};

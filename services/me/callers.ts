import { AxiosResponse } from "axios";
import { authRequest } from "../axios";
import { ME_PATH } from "./path";

export const getMe = async () => {
  const access_token = localStorage.getItem("accessToken");
  if (!access_token) {
    return {
      data: {
        id: 0,
        email: "",
      },
    } as AxiosResponse<TMeResponse>;
  }

  return authRequest.get<TMeResponse, AxiosResponse<TMeResponse>>(ME_PATH);
};

import { useMutation } from "react-query";
import { login, register } from "./callers";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: TCredentialRequest) => register(data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: TCredentialRequest) => login(data),
  });
};

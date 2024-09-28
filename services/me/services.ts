import { useQuery } from "react-query";
import { getMe } from "./callers";

export const keyUser = {
  me: "ME",
};

export const useGetMe = () => {
  return useQuery({
    queryKey: [keyUser.me],
    queryFn: () => {
      return getMe();
    },
  });
};

import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import {
  countTotalLinks,
  createLink,
  getYtbOembed,
  listLinks,
} from "./callers";

export const keyLink = {
  ytbOembed: "YTB_OEMBED",
  links: "LINKS",
  totalLinks: "TOTAL_LINKS",
};

export const PAGE_LIMIT = 5;

export const useGetYtbOembed = (url: string) => {
  return useQuery({
    queryKey: [keyLink.ytbOembed, url],
    queryFn: () => {
      return getYtbOembed(url);
    },
    retry: false,
  });
};

export const useLinkCreation = () => {
  return useMutation({
    mutationFn: (data: TLinkCreationRequest) => createLink(data),
  });
};

export const useListLinks = () => {
  return useInfiniteQuery({
    queryKey: [keyLink.links],
    queryFn: ({ pageParam = 1 }) => {
      return listLinks(pageParam);
    },
  });
};

export const useCountTotalLinks = () => {
  return useQuery({
    queryKey: [keyLink.totalLinks],
    queryFn: () => {
      return countTotalLinks();
    },
  });
};

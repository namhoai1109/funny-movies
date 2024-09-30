import axios, { AxiosResponse } from "axios";
import {
  LINK_CREATION_PATH,
  LINK_LIST_PATH,
  TOTAL_LINKS_PATH,
  YOUTUBE_OEMBED_URL,
} from "./paths";
import { authRequest, request } from "../axios";
import { PAGE_LIMIT } from "./services";

export const getYtbOembed = async (url: string) => {
  return axios.get<TYtbOembedResponse, AxiosResponse<TYtbOembedResponse>>(
    YOUTUBE_OEMBED_URL,
    {
      params: {
        url,
        format: "json",
      },
    }
  );
};

export const createLink = async (data: TLinkCreationRequest) => {
  return authRequest.post(LINK_CREATION_PATH, data);
};

export const listLinks = async (page: number) => {
  const links = await request.get<
    TLinkResponse[],
    AxiosResponse<TLinkResponse[]>
  >(LINK_LIST_PATH, {
    params: {
      p: page,
      l: PAGE_LIMIT,
      s: "created_at",
      o: "desc",
    },
  });

  const resArr = await Promise.all(
    links.data.map(async (link) => {
      const { data } = await getYtbOembed(link.url);
      return { ...link, ...data } as TLinkResponse & TYtbOembedResponse;
    })
  );

  return resArr;
};

export const countTotalLinks = async () => {
  const { data } = await request.get<
    TTotalLinksResponse,
    AxiosResponse<TTotalLinksResponse>
  >(TOTAL_LINKS_PATH);
  return data.total;
};

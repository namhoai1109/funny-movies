type TCredentialRequest = {
  email: string;
  password: string;
};

type TTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

type TUserResponse = {
  id: number;
  email: string;
};

type TYtbOembedResponse = {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail_url: string;
  html: string;
};

type TLinkCreationRequest = {
  url: string;
};

type TLinkResponse = {
  id: number;
  url: string;
  user: TUserResponse;
};

type TTotalLinksResponse = {
  total: number;
};

type TWsMessage = {
  video_title: string;
  email_sender: string;
};

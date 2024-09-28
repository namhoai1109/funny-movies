type TCredentialRequest = {
  email: string;
  password: string;
};

type TTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

type TMeResponse = {
  id: number;
  email: string;
};

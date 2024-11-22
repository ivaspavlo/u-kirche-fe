export interface ILoginReq {
  email: string;
  password: string;
}

export interface ILoginRes {
  jwt: string;
}

import { LANGUAGE } from "@app/constants";

export interface IMeetReq {
  name: string;
  email: string;
  lang: LANGUAGE
  phone?: string;
  message?: string;
  recaptcha: string;
}

export interface IMeetRes {
  success: boolean;
}

import service, { Response } from "@/utils/request";
import { AxiosResponse } from "axios";

export default {
  getCode(username: string, module: string): Promise<Response> {
    return service({
      method: "post",
      url: "/getCode/",
      data: { username, module },
    });
  },

  getError(): Promise<Response> {
    return service({
      method: "post",
      url: "/error/",
    });
  },

  register(
    username: string,
    password: string,
    code: number
  ): Promise<Response> {
    return service({
      method: "post",
      url: "/register/",
      data: { username, password, code },
    });
  },

  accountCheck(username: string): Promise<Response> {
    return service({
      method: "post",
      url: "/account/check",
      data: { username },
    });
  },

  login(username: string, password: string, code: string): Promise<Response> {
    return service({
      method: "post",
      url: "/login/",
      data: { username, password, code },
    });
  },
};

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000,
});

export interface WebResponse {
  resCode: number;
  message: string;
  data: any | undefined;
}

export type Response = AxiosResponse<WebResponse>;

service.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // do something before send request
    return config;
  },
  function (error: any) {
    // do something when an error erquest
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function (response: AxiosResponse<WebResponse>) {
    // do something when receive a response
    const data = response.data;
    if (data.resCode !== 0) {
      console.log(response);
      return Promise.reject(response);
    }
    return response;
  },
  function (error: AxiosError) {
    // do something when an error request
    console.log(error);
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({
        resCode: -1,
        message: error.message,
        data: error.request,
      } as WebResponse);
    }
  }
);

export default service;

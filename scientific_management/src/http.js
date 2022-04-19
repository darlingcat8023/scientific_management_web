import axios from "axios";
import cookiesUtils from "./cookies";
import router from "./router";
import { Message } from "element-ui";

// axios 配置
axios.defaults.timeout = 50000;
axios.defaults.baseURL = "http://192.168.31.122:8080/";

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    let cookies = cookiesUtils.GetCookiesToken();
    if (cookies) {
      config.headers.token = cookies.token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        cookiesUtils.DeleteCookies();
        // 只有在当前路由不是登录页面才跳转
        router.push({ path: "/login" });
      } else if (error.response.status === 403) {
        Message.error("权限校验失败！");
      } else if (error.response.status === 400) {
        Message.error("接口异常！");
      }
    }
    return Promise.reject(error.response.data);
  }
);

export default axios;

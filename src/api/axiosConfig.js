import axios from "axios";
import { useRouter } from "vue-router"; // 引入 Vue Router 的 useRouter 函数，用于路由跳转

// 创建 axios 实例
const instance = axios.create({
  baseURL: "http://8.149.133.7:7999/", // 你的后端 API 基础地址
  timeout: 5000, // 设置超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // 通常对于 JWT 令牌，使用 Bearer 认证方案
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // 检查是否是 401 未授权错误且请求未重试过
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        // 发送刷新令牌的请求，这里假设后端刷新令牌的接口是 /api/token/refresh/
        const refreshResponse = await instance.post("/api/token/refresh/", {
          refresh: refreshToken,
        });
        const { access } = refreshResponse.data;
        localStorage.setItem("accessToken", access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        // 重新发送原始请求
        return instance(originalRequest);
      } catch (refreshError) {
        // 处理刷新令牌失败的情况，清除所有令牌并跳转到登录页面
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // 使用 useRouter 获取路由实例并进行跳转
        const router = useRouter();
        router.push("/login");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

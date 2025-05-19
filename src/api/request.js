import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
});

service.interceptors.response.use(
  (response) => {
    if (response.data.code !== 200) {
      ElMessage.error(response.data.message || "请求失败");
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    ElMessage.error("网络错误：" + error.message);
    return Promise.reject(error);
  }
);

export default service;

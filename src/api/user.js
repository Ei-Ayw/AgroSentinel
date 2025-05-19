// api/user.js
import request from "./request";

// 获取用户信息
export const getUserInfo = (userId) => {
  return request({
    url: "/api/user/info",
    method: "get",
    params: { userId },
  });
};

// 更新用户信息
export const updateUserInfo = (data) => {
  return request({
    url: "/api/user/update",
    method: "post",
    data,
  });
};

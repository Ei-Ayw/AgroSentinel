import request from "./request";
import axios from "axios";

export const register = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post("http://localhost:7999/api/register/", {
      username: data.username,
      password: data.password,
      email: data.email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLocation = (token) => {
  return request({
    url: "/api/user/location",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateLocation = (data) => {
  return request({
    url: "/api/user/location",
    method: "post",
    data,
  });
};

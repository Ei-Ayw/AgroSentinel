import request from "./request";

export const visionDetect = (formData) => {
  return request({
    url: "/vision/detect",
    method: "post",
    data: formData,
  });
};

export const multimodalDetect = (formData) => {
  return request({
    url: "/multimodal",
    method: "post",
    data: formData,
  });
};

export const getHistory = (params) => {
  return request({
    url: "/history",
    method: "get",
    params,
  });
};

export const generateReport = (data) => {
  return request({
    url: "/report/generate",
    method: "post",
    data,
  });
};

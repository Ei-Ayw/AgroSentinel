import request from "./request";
import axios from "axios";

export const getGridData = async (longitude, latitude, zoom) => {
  // 直接返回 Promise，让调用者处理错误
  return axios
    .get(
      `/api/grid-data?longitude=${longitude}&latitude=${latitude}&zoom=${zoom}`
    )
    .then((response) => response.data);
};

export const getAnomalyData = (gridId, startDate) => {
  return request({
    url: "/api/map/anomalies",
    method: "get",
    params: { gridId, startDate },
  });
};

export const getWeatherData = (gridId, timeType) => {
  return request({
    url: "/api/detail/weather",
    method: "get",
    params: { gridId, timeType },
  });
};

export const getDecisionData = (gridId, ruleId) => {
  return request({
    url: "/api/detail/decision",
    method: "post",
    data: { gridId, ruleId },
  });
};

export const pushAlert = (gridId, alertLevel) => {
  return request({
    url: "/api/alert/push",
    method: "post",
    data: { gridId, alertLevel },
  });
};

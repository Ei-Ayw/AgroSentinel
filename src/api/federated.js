import request from "./request";

export const getTrainingStatus = (params) => {
  return request({
    url: "/federated/training-status",
    method: "get",
    params,
  });
};

export const getModelPerformance = (params) => {
  return request({
    url: "/federated/performance",
    method: "get",
    params,
  });
};

export const userUpload = (data) => {
  return request({
    url: "/user/upload",
    method: "post",
    data,
  });
};

export const checkUploadStatus = (uploadId) => {
  return request({
    url: `/user/uploads/${uploadId}`,
    method: "get",
  });
};

export const qa = (data) => {
  return request({
    url: "/qa",
    method: "post",
    data,
  });
};

export const qaStream = (data) => {
  return request({
    url: "/qa/stream",
    method: "post",
    data,
  });
};

export const getDetectionReports = (params) => {
  return request({
    url: "/detection-reports",
    method: "get",
    params,
  });
};

export const importExpertDocuments = (data) => {
  return request({
    url: "/expert-knowledge/import",
    method: "post",
    data,
  });
};

export const queryKnowledgeGraph = (params) => {
  return request({
    url: "/expert-knowledge/graph",
    method: "get",
    params,
  });
};

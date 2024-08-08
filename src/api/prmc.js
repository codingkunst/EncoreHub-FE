import axiosInstance from "./axiosInstance";

export const fetchPrmcs = async () => {
  try {
    const response = await axiosInstance.get("/prmc");
    return response.data;
  } catch {
    console.error("prmc API 요청 실패:", error);
    throw new Error(error.response?.data?.message || "prmc API 요청 실패");
  }
};

export const fetchLikePrmcs = async () => {
  try {
    const response = await axiosInstance.get("/likePrmc");
    return response.data;
  } catch {
    console.error("likePrmc API 요청 실패:", error);
    throw new Error(error.response?.data?.message || "likePrmc API 요청 실패");
  }
};

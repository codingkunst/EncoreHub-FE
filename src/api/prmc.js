import axiosInstance from "./axiosInstance";

export const fetchBoxOffPrmcs = async () => {
  try {
    const response = await axiosInstance.get("/api/boxoffice/all");
    return response.data;
  } catch {
    console.error("prmc API 요청 실패:");
    throw new Error("prmc API 요청 실패");
  }
};

// export const fetchLikePrmcs = async () => {
//   try {
//     const response = await axiosInstance.get("/likePrmc");
//     return response.data;
//   } catch {
//     console.error("likePrmc API 요청 실패:", error);
//     throw new Error(error.response?.data?.message || "likePrmc API 요청 실패");
//   }
// };

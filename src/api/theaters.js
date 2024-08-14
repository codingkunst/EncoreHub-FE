import useAuthStore from "../zustand/useAuthStore";
import axiosInstance from "./axiosInstance";

export const fetchRegions = async () => {
  try {
    const response = await axiosInstance.get("/api/region?sidonm=서울");
    return response.data;
  } catch {
    console.error("theater API 요청 실패:", error);
    throw new Error(error.response?.data?.message || "theater API 요청 실패");
  }
};

export const fetchTheaters = async (region) => {
  try {
    const response = await axiosInstance.get(
      `/api/theaters/region?sidonm=서울&gugunnm=${region}`
    );
    return response.data;
  } catch {
    console.error("theater API 요청 실패:", error);
    throw new Error(error.response?.data?.message || "theater API 요청 실패");
  }
};

export const fetchSearchTheaters = async (theater) => {
  try {
    const response = await axiosInstance.get(
      `/api/theaters/search?theaterName=${theater}`
    );
    return response.data;
  } catch {
    console.error("search theater API 요청 실패:");
    // throw new Error(
    //   error.response?.data?.message || "search theater API 요청 실패"
    // );
  }
};

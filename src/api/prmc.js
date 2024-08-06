import axiosInstance from "./axiosInstance";

export const fetchPrmcs = async () => {
  const response = await axiosInstance.get("/prmc");
  return response.data;
};

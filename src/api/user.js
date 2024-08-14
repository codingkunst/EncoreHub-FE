import axiosInstance, { axiosWithAuth } from "./axiosInstance";

export const toggleFavoriteTheater = async (
  theaterId,
  accessToken,
  refreshToken
) => {
  try {
    const axiosInstance = axiosWithAuth(accessToken, refreshToken);
    const response = await axiosInstance.post("/api/favorite-theaters/toggle", {
      theaterId,
    });
    console.log("API response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to add favorite theater:", error);
    throw error;
  }
};

export const getFavoriteTheaters = async (accessToken, refreshToken) => {
  try {
    const axiosAuthInstance = axiosWithAuth(accessToken, refreshToken);
    const response = await axiosAuthInstance.get(
      "/api/favorite-theaters/mypage"
    );
    console.log("fetch fav theaters:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite theaters:", error);
    throw error;
  }
};

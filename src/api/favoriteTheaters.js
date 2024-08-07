import axiosInstance from "./axiosInstance";

export const fetchFavoriteTheaters = async () => {
  const response = await axiosInstance.get("/favoriteTheater");
  return response.data;
};

export const addFavoriteTheater = async (theater, theaterId) => {
  const response = await axiosInstance.post("/favoriteTheater", {
    venue: theater,
    theaterId,
  });
  return response.data;
};

export const removeFavoriteTheater = async (theaterId) => {
  const response = await axiosInstance.delete("/favoriteTheater", {
    data: { theaterId },
  });
  return response.data;
};

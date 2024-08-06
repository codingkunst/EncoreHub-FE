import axiosInstance from "./axiosInstance";

export const fetchFavoriteTheaters = async () => {
  const response = await axiosInstance.get("/favorite");
  return response.data;
};

export const addFavoriteTheater = async (theater, theaterId) => {
  const response = await axiosInstance.post("/favorite", {
    venue: theater,
    theaterId,
  });
  return response.data;
};

export const removeFavoriteTheater = async (theaterId) => {
  const response = await axiosInstance.delete("/favorite", {
    data: { theaterId },
  });
  return response.data;
};

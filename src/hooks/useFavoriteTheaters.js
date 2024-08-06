import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchFavoriteTheaters,
  addFavoriteTheater,
  removeFavoriteTheater,
} from "../api/favoriteTheaters";
import useFavoriteTheatersStore from "../zustand/useFavoriteTheatersStore";

export const useFetchFavoriteTheaters = () => {
  const setFavoriteTheaters = useFavoriteTheatersStore(
    (state) => state.setFavoriteTheaters
  );
  return useQuery({
    queryKey: ["favoriteTheaters"],
    queryFn: fetchFavoriteTheaters,
    onSuccess: (data) => {
      setFavoriteTheaters(data);
    },
    onError: (error) => {
      console.error("Error fetching favorite theaters", error);
    },
  });
};

export const useaddFavoriteTheater = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFavoriteTheater,
    onSuccess: () => {
      queryClient.invalidateQueries(["favoriteTheaters"]);
    },
    onError: (error) => {
      console.error("Error: add favority theater", error);
    },
  });
};
export const useRemoveFavoriteTheater = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFavoriteTheater,
    onSuccess: () => {
      queryClient.invalidateQueries(["favoriteTheaters"]);
    },
    onError: (error) => {
      console.error("Error: remove favority theater", error);
    },
  });
};

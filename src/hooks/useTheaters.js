import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
} from "@tanstack/react-query";
import {
  fetchRegions,
  fetchTheaters,
  fetchSearchTheaters,
} from "../api/theaters";
import { toggleFavoriteTheater, getFavoriteTheaters } from "../api/user";
import useTheaterStore from "../zustand/useTheatersStore";
import useAuthStore from "../zustand/useAuthStore";

export const useFetchRegions = () => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegions,
  });
};

export const useFetchTheaters = () => {
  const selectedRegion = useTheaterStore((state) => state.selectedRegion);
  return useQuery({
    queryKey: ["theaters", selectedRegion],
    queryFn: () => {
      if (!selectedRegion) {
        return Promise.resolve([]); // selectedRegion이 없을 경우 빈 배열 반환
      }
      return fetchTheaters(selectedRegion);
    },
    enabled: !!selectedRegion,
  });
};

export const useFetchSearchTheater = (theater) => {
  const setsearchTheaters = useTheaterStore((state) => state.setsearchTheaters);
  const searchTheaterName = useTheaterStore((state) => state.searchTheaterName);
  return useQuery({
    queryKey: ["searchTheater", searchTheaterName],
    queryFn: () => {
      if (!searchTheaterName) {
        return Promise.resolve([]);
      }
      return fetchSearchTheaters(searchTheaterName);
    },
    onSuccess: (data) => {
      setsearchTheaters(data);
      console.log("Success fetch search theaters");
    },
    onError: (error) => {
      console.error("Error fetching search theater", error);
    },
  });
};

export const useFetchFavoriteTheaters = () => {
  const { accessToken, refreshToken } = useAuthStore((state) => ({
    accessToken: state.accessToken,
    refreshToken: state.token,
  }));
  return useQuery({
    queryKey: ["favoriteTheaters"],
    queryFn: () => getFavoriteTheaters(accessToken, refreshToken),
    staleTime: 1000 * 60 * 5, // 데이터 신선도 유지 시간
    cacheTime: 1000 * 60 * 10, // 데이터 캐시 시간
  });
};

export const useToggleFavoriteTheater = () => {
  const { accessToken, refreshToken } = useAuthStore((state) => ({
    accessToken: state.accessToken,
    refreshToken: state.token,
  }));
  return useMutation({
    mutationFn: async (theaterId) => {
      try {
        const result = await toggleFavoriteTheater(
          theaterId,
          accessToken,
          refreshToken
        );
        console.log(result);
        return result;
      } catch (error) {
        console.error("toggle favorite theater failed:", error.message);
        throw new Error(error.message || "toggle favorite theater failed");
      }
    },
  });
};

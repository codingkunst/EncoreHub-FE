import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchBoxOffPrmcs } from "../api/prmc";
import usePrmcStore from "../zustand/usePrmcStore";
import { getFavoritePfmcs, toggleFavoritePfmc } from "../api/user";
import useAuthStore from "../zustand/useAuthStore";

export const useFetchBoxOffPrmcs = () => {
  const setBoxOffPrmcs = usePrmcStore((state) => state.setBoxOffPrmcs);
  return useQuery({
    queryKey: ["boxOffPrmcs"],
    queryFn: fetchBoxOffPrmcs,
    onSuccess: (data) => {
      setBoxOffPrmcs(data);
      console.log("success");
    },
    onError: (error) => {
      console.error("Error fetching regions", error);
    },
    enabled: true,
  });
};

export const useFetchFavoritePfmcs = () => {
  const { accessToken, refreshToken } = useAuthStore((state) => ({
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  }));
  return useQuery({
    queryKey: ["favoritePfmcs"],
    queryFn: () => getFavoritePfmcs(accessToken, refreshToken),
    staleTime: 1000 * 60 * 5, // 데이터 신선도 유지 시간
    cacheTime: 1000 * 60 * 10, // 데이터 캐시 시간
  });
};

export const useToggleFavoritePfmc = () => {
  const { accessToken, refreshToken } = useAuthStore((state) => ({
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  }));
  return useMutation({
    mutationFn: async (performanceId) => {
      try {
        const result = await toggleFavoritePfmc(
          performanceId,
          accessToken,
          refreshToken
        );
        console.log(result);
        return result;
      } catch (error) {
        console.error("toggle favorite pfmc failed:", error.message);
        throw new Error(error.message || "toggle favorite pfmc failed");
      }
    },
  });
};

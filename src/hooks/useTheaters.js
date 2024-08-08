import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchRegions,
  // fetchTheaters,
  // fetchSearchTheaters,
  // addFavoriteTheaters,
  // removeFavoriteTheaters,
} from "../api/theaters";
import useTheaterStore from "../zustand/useTheatersStore";

export const useFetchRegions = () => {
  const setRegions = useTheaterStore((state) => state.setRegions);
  return useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegions,
    onSuccess: (data) => {
      setRegions(data);
    },
    onError: (error) => {
      console.error("Error fetching regions", error);
    },
    enabled: true,
  });
};

// export const useFetchTheaters = () => {
//   const setTheaters = useTheaterStore((state) => state.setTheaters);
//   const selectedRegion = useTheaterStore((state) => state.selectedRegion);
//   return useQuery({
//     queryKey: ["theaters", selectedRegion],
//     queryFn: () => {
//       if (!selectedRegion) {
//         return Promise.resolve([]); // selectedRegion이 없을 경우 빈 배열 반환
//       }
//       return fetchTheaters(selectedRegion);
//     },
//     onSuccess: (data) => {
//       setTheaters(data);
//     },
//     onError: (error) => {
//       console.error("Error fetching theaters", error);
//     },
//     enabled: !!selectedRegion,
//   });
// };

// export const useFetchSearchTheater = () => {
//   const setsearchTheater = useTheaterStore((state) => state.setsearchTheater);
//   return useQuery({
//     queryKey: ["searchTheater"],
//     queryFn: fetchSearchTheaters,
//     onSuccess: (data) => {
//       setsearchTheater(data);
//       console.log("Success fetch search theaters");
//     },
//     onError: (error) => {
//       console.error("Error fetching search theater", error);
//     },
//   });
// };

// export const useAddFavoriteTheater = () => {
//   const queryClient = useQueryClient();
//   const setFavoriteTheaters = useTheaterStore((state) => state.setFavoriteTheaters);
//   return useMutation({
//     mutationFn: async (theaterId) => {
//       try {
//         const data = await addFavoriteTheaters(theaterId);
//         return data;
//       } catch (error) {
//         console.error("Error adding theater to favorites:", error.message);
//         throw new Error(error.message || "Failed to add theater to favorites");
//       }
//     },
//     onSuccess: (data) => {
//       // 서버에서 즐겨찾기 목록을 받아와서 상태를 업데이트
//       setFavoriteTheaters((prev) => [...prev, data.theaterId]);
//       queryClient.invalidateQueries(["favoriteTheaters"]); // 쿼리 무효화하여 최신 상태 반영
//       console.log("Theater added to favorites:", data);
//     },
//     onError: (error) => {
//       console.error("Error adding theater to favorites:", error.message);
//     },
//   });
// };

// export const useRemoveFavoriteTheater = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (theaterId) => {
//       await removeFavoriteTheaters(theaterId);
//       // 성공적으로 삭제된 후, 즐겨찾기 목록을 재패칭하여 업데이트
//       queryClient.invalidateQueries(["favoriteTheaters"]);
//     },
//     onSuccess: () => {
//       console.log("Theater removed from favorites successfully");
//     },
//     onError: (error) => {
//       console.error('Error removing favorite theater:', error.message);
//     },
//   });
// };

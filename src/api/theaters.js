import useAuthStore from "../zustand/useAuthStore";
import axiosInstance from "./axiosInstance";

//찐
export const fetchRegions = async () => {
  try {
    const response = await axiosInstance.get(`/region?sidonm=서울`);
    return response.data;
  } catch {
    console.error("theater API 요청 실패:", error);
    throw new Error(error.response?.data?.message || "theater API 요청 실패");
  }
};
//
// export const fetchTheaters = async (region) => {
//   try {
//     const response = await axiosInstance.get(`/api/regions?sidonm=서울&gugunnm=${region}`);
//     return response.data;
//   } catch {
//     console.error("theater API 요청 실패:", error);
//     throw new Error(error.response?.data?.message || "theater API 요청 실패");
//   }
// };
//
// export const fetchSearchTheaters = async (theater) => {
//   try {
//     const response = await axiosInstance.get(`/api/theater?query=${theater}`);
//     return response.data;
//   } catch {
//     console.error("search theater API 요청 실패:", error);
//     throw new Error(
//       error.response?.data?.message || "search theater API 요청 실패"
//     );
//   }
// };

// export const addFavoriteTheaters = async (theaterId) => {
//   const { accesstoken } = useAuthStore((state) => state.accessToken);
//   try {
//     const response = await axiosInstance.post(
//       `/api/theater/favorite/${theaterId}`,
//       {
//         headers: {
//           AccessToken: `Bearer ${accesstoken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data; // 서버의 응답 데이터 반환
//   } catch (error) {
//     console.error(
//       "Error adding theater to favorites:",
//       error.response?.data || error.message
//     );
//     alert("Failed to add theater to favorites");
//   }
// };

// export const removeFavoriteTheaters = async (theaterId) => {
//   const { accesstoken } = useAuthStore((state) => state.accessToken);

//   try {
//     const response = await axiosInstance.delete(
//       `/api/theater/favorite/${theaterId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${accesstoken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response;
//   } catch (error) {
//     console.error(
//       "Error removing theater to favorites:",
//       error.response?.data || error.message
//     );
//     alert("Failed to remove theater to favorites");
//   }
// };

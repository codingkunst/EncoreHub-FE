import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../zustand/useAuthStore";
import { refreshAccessToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// // 요청 인터셉터
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const { accessToken } = useAuthStore.getState((state) => ({
//       accessToken: state.accessToken,
//     }));

//     // 특정 API 요청을 제외한 모든 요청에 Authorization 헤더를 추가합니다.
//     if (accessToken && !config.url.includes("/api/member/token")) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 응답 인터셉터
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // 상태에서 필요한 값 및 함수 가져오기
//     const { refreshToken, login, logout } = useAuthStore((state) => ({
//       refreshToken: state.refreshToken, // refreshToken으로 수정
//       login: state.login,
//       logout: state.logout,
//     }));

//     // 401 오류가 발생했지만 요청이 로그인 또는 토큰 갱신과 관련된 것이 아닌 경우
//     if (error.response?.status === 401 && refreshToken) {
//       // 액세스 토큰 갱신과 관련된 API 호출이 아닌 경우
//       if (originalRequest.url !== "/api/member/token") {
//         try {
//           // 액세스 토큰 재발급
//           const newAccessToken = await refreshAccessToken();
//           useAuthStore.getState().login(newAccessToken, refreshToken); // 새로운 액세스 토큰 저장
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return axiosInstance(originalRequest); // 원래 요청을 새로운 액세스 토큰으로 재전송
//         } catch (refreshError) {
//           // 액세스 토큰 갱신 실패 시 로그아웃
//           logout();
//           return Promise.reject(refreshError);
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;

const queryClient = new QueryClient();

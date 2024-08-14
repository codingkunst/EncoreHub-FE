import axiosInstance from "./axiosInstance";
import axios from "axios";

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      `/api/member/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          //클라이언트가 서버한테 요청하는(원하는) 타입
          Accept: "application/json", //현재 서버한테 보내는 데이터 타입
        },
      }
    );
    console.log(response);
    const accessToken = response.headers["accesstoken"];
    const refreshToken = response.headers["refreshtoken"];
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Login failed:", error);
    alert(`Login failed:, ${error}`);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post(`/api/member/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const refreshAccessToken = async () => {
  const { refreshToken, login, logout } = useAuthStore((state) => ({
    refreshToken: state.token,
    login: state.login,
    logout: state.logout,
  }));

  try {
    const response = await axiosInstance.post(
      "/api/member/token",
      {},
      {
        headers: {
          AccessToken: `Bearer ${refreshToken}`,
        },
      }
    );

    const newAccessToken = response.data.accessToken;
    login(newAccessToken, refreshToken); // 상태를 업데이트합니다.
    return newAccessToken;
  } catch (error) {
    logout(); // 액세스 토큰 재발급 실패 시 로그아웃합니다.
    throw new Error("Failed to refresh access token");
  }
};

// export const getUser = async (userId) => {
//   try {
//     const response = await axiosInstance.get(`/member/${userId}`);
//     return response.data;
//   } catch (error) {
//     throw {
//       response: {
//         data: {
//           message: error.message || "Failed to fetch user",
//         },
//       },
//     };
//   }
// };

// export const updateUser = async (userId, userData) => {
//   const response = await axiosInstance.put(`/member/${userId}`, userData);
//   return response.data;
// };

// // 논리적 탈퇴 (회원 비활성화)
// export const deactivateUser = async (userId) => {
//   const response = await axiosInstance.patch(`/member/${userId}/deactivate`);
//   return response.data;
// };

//Social Login
export const kakaoLogin = async () => {
  
}

// //Social Login
// export const kakaoLogin = async (socialData) => {
//   const response = await axiosInstance.post("/member/login/kakao", socialData);
//   return response.data;
// };
// export const naverLogin = async (socialData) => {
//   const response = await axiosInstance.post("/member/login/naver", socialData);
//   return response.data;
// };
// export const googleLogin = async (socialData) => {
//   const response = await axiosInstance.post("/member/login/google", socialData);
//   return response.data;
// };

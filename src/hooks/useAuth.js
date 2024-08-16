import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../zustand/useAuthStore";
import {
  login as apiLogin,
  register as apiRegister,
  // getUser as apiGetUser,
  // updateUser,
  // deactivateUser,
  // kakaoLogin,
  // naverLogin,
  // googleLogin,
} from "../api/auth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (credentials) => {
      try {
        const response = await apiLogin(credentials);
        const accessToken = response.accessToken;
        const refreshToken = response.refreshToken;
        return { accessToken, refreshToken };
      } catch (error) {
        console.error("Login failed:", error.message);
        throw new Error(error.message || "Login failed");
      }
    },
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      queryClient.invalidateQueries(["user"]);
      navigate("/");
      login(accessToken, refreshToken);
      // console.log(
      //   "accessToken: " + accessToken,
      //   "refreshToken: " + refreshToken
      // );
      // console.log("Login successful");
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (userData) => {
      try {
        const result = await apiRegister(userData);
        return result;
      } catch (error) {
        console.error("Registration failed:", error.message);
        throw new Error(error.message || "Registration failed");
      }
    },
    onSuccess: (data) => {
      // console.log("Registration successful:", data);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error.message);
    },
  });
};

// export const useGetUser = (userId) => {
//   const token = useAuthStore((state) => state.token);
//   return useQuery(
//     ["user", userId],
//     async () => {
//       if (token && userId) {
//         return await apiGetUser(userId);
//       }
//       return null;
//     },
//     {
//       enabled: !!token && !!userId,
//     }
//   );
// };

// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data) => {
//       await updateUser(data.userId, data.userData);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["user"]);
//     },
//     onError: (error) => {
//       console.error("Update user failed:", error);
//     },
//   });
// };

// export const useDeactivateUser = () => {
//   const queryClient = useQueryClient();
//   const logout = useAuthStore((state) => state.logout);

//   return useMutation({
//     mutationFn: async (userId) => {
//       await deactivateUser(userId);
//       logout();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["user"]);
//     },
//     onError: (error) => {
//       console.error("Deactivate user failed:", error);
//     },
//   });
// };

// export const useKakaoLogin = () => {
//   const login = useAuthStore((state) => state.login);

//   return useMutation({
//     mutationFn: async (socialData) => {
//       const response = await kakaoLogin(socialData);
//       if (response.accessToken && response.refreshToken) {
//         login(response.accessToken, response.refreshToken);
//       }
//       return response;
//     },
//   });
// };

// export const useNaverLogin = () => {
//   const login = useAuthStore((state) => state.login);

//   return useMutation({
//     mutationFn: async (socialData) => {
//       const response = await naverLogin(socialData);
//       if (response.accessToken && response.refreshToken) {
//         login(response.accessToken, response.refreshToken);
//       }
//       return response;
//     },
//   });
// };

// export const useGoogleLogin = () => {
//   const login = useAuthStore((state) => state.login);

//   return useMutation({
//     mutationFn: async (socialData) => {
//       const response = await googleLogin(socialData);
//       if (response.accessToken && response.refreshToken) {
//         login(response.accessToken, response.refreshToken);
//       }
//       return response;
//     },
//   });
// };

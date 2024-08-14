import { create } from "zustand";
import Cookies from "js-cookie";

const useAuthStore = create((set) => ({
  accessToken: Cookies.get("accessToken") || null,
  token: localStorage.getItem("refreshToken") || null,
  isAuthenticated: Cookies.get("refreshToken") ? true : false,
  login: (accessToken, refreshToken) => {
    // 리프레시 토큰은 쿠키에 저장
    Cookies.set("accessToken", accessToken);
    // 액세스 토큰은 로컬 스토리지에 저장 (새로고침 시 토큰 유지)
    localStorage.setItem("refreshToken", refreshToken);

    set({
      token: refreshToken,
      accessToken,
      isAuthenticated: true,
    });

    console.log("Refresh Token saved:", localStorage.getItem("refreshToken"));
    console.log("Access Token saved in Cookies:", Cookies.get("accessToken"));
  },
  logout: () => {
    Cookies.remove("accessToken");
    localStorage.removeItem("refreshToken");

    set({
      token: null,
      accessToken: null,
      isAuthenticated: false,
    });

    console.log("Refresh Token removed:", localStorage.getItem("refreshToken"));
    console.log(
      "Access Token removed from Cookies:",
      Cookies.get("accessToken")
    );
    window.location.reload();
  },
}));

export default useAuthStore;

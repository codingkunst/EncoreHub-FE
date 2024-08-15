import { create } from "zustand";
import Cookies from "js-cookie";

const useAuthStore = create((set) => ({
  token: Cookies.get("refreshToken") || null,
  accessToken: localStorage.getItem("accessToken") || null,
  isAuthenticated: Cookies.get("refreshToken") ? true : false,
  login: (accessToken, refreshToken) => {
    // 리프레시 토큰은 쿠키에 저장
    Cookies.set("refreshToken", refreshToken);
    // 액세스 토큰은 로컬 스토리지에 저장 (새로고침 시 토큰 유지)
    localStorage.setItem("accessToken", accessToken);

    set({
      token: refreshToken,
      accessToken,
      isAuthenticated: true,
    });

    console.log("Access Token saved:", localStorage.getItem("accessToken"));
    console.log("Refresh Token saved in Cookies:", Cookies.get("refreshToken"));
  },
  logout: () => {
    Cookies.remove("refreshToken");
    localStorage.removeItem("accessToken");

    set({
      token: null,
      accessToken: null,
      isAuthenticated: false,
    });

    console.log("Access Token removed:", localStorage.getItem("accessToken"));
    console.log(
      "Refresh Token removed from Cookies:",
      Cookies.get("refreshToken")
    );
    window.location.reload();
  },
}));

export default useAuthStore;

import { create } from "zustand";
import Cookies from "js-cookie";

const useAuthStore = create((set) => ({
  AccessToken: Cookies.get("AccessToken") || null,
  token: localStorage.getItem("refreshToken") || null,
  isAuthenticated: Cookies.get("refreshToken") ? true : false,
  login: (AccessToken, token) => {
    // 리프레시 토큰은 쿠키에 저장
    if (AccessToken || token) {
      Cookies.set("AccessToken", AccessToken);
      // 액세스 토큰은 로컬 스토리지에 저장 (새로고침 시 토큰 유지)
      localStorage.setItem("refreshToken", token);

      set({
        token: token,
        AccessToken,
        isAuthenticated: true,
      });

      console.log("Refresh Token saved:", localStorage.getItem("refreshToken"));
      console.log("Access Token saved in Cookies:", Cookies.get("AccessToken"));
      console.log(isAuthenticated);
    }
  },
  logout: () => {
    Cookies.remove("AccessToken");
    localStorage.removeItem("refreshToken");

    set({
      token: null,
      AccessToken: null,
      isAuthenticated: false,
    });

    console.log("Refresh Token removed:", localStorage.getItem("refreshToken"));
    console.log(
      "Access Token removed from Cookies:",
      Cookies.get("AccessToken")
    );
    window.location.reload();
  },
  initialize: () => {
    set({
      AccessToken: Cookies.get("AccessToken") || null,
      token: localStorage.getItem("refreshToken") || null,
      isAuthenticated: Cookies.get("AccessToken") ? true : false,
    });
  },
}));

export default useAuthStore;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const RedirectPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const fetchToken = async () => {
      if (!code) {
        setError("Authorization code is missing");
        setLoading(false);
        return;
      }

      try {
        // 카카오 로그인 API 호출
        const response = await axiosInstance.get(
          `/oauth/kakao/callback?code=${code}`
        );

        console.log("Logged in successfully:", response.data);

        // 로그인 성공 후 처리 (예: JWT 토큰 저장, 사용자 데이터 설정 등)
        localStorage.setItem("token", response.data.token);

        // 로그인 후 페이지로 리다이렉트 (홈 페이지나 대시보드 등으로)
        navigate("/");
      } catch (err) {
        console.error("Login failed:", err.message);
        setError("Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [code, navigate]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <p>Redirecting...</p>}
      <p>로그인 중입니다</p>
    </div>
  );
};

export default RedirectPage;

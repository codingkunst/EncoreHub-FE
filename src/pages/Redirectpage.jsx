import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";

const Redirectpage = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // const axiosUrl = axios.create({
  //   baseURL: "https://api.encorehub.kro.kr", // 백엔드 API의 기본 URL을 설정하세요.
  //   withCredentials: true, // 쿠키를 포함하여 요청을 보낼 수 있도록 설정합니다.
  // });
  useEffect(() => {
    const token = getCookie("accessToken");

    const login = async () => {
      const response = axiosUrl.get(`/oauth/kakao/callback?code=${code}`, {
        headers: {
          accessToken: token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response;
    };
    login();
    console.log(token);
  }, []);

  return (
    <div>
      <h1>로그인 중입니다.</h1>
    </div>
  );
};
export default Redirectpage;

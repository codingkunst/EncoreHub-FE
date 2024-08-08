import React from "react";

const SocialLogin = () => {
  const handleLogin = (provider) => {
    const loginUrl = `${process.env.REACT_APP_API_BASE_URL}/auth/${provider}`;
    window.location.href = loginUrl; // 소셜 로그인 제공자 페이지로 리디렉션
  };

  return (
    <div>
      <button onClick={() => handleLogin("kakao")}>카카오로 로그인</button>
      <button onClick={() => handleLogin("naver")}>네이버로 로그인</button>
      <button onClick={() => handleLogin("google")}>구글로 로그인</button>
    </div>
  );
};

export default SocialLogin;

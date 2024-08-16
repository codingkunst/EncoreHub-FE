import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useAuthStore from "../zustand/useAuthStore";
import MyPfmcCard from "../components/mypfmc/MyPfmcCard";
import Map from "../components/Map";

// 슬라이드 설정
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MyPage = () => {
  const apiKey = import.meta.env.VITE_SERVER_URL;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // 인가
  const refreshToken = useAuthStore((state) => state.token); // 리프레쉬 토큰
  const accessToken = useAuthStore((state) => state.accessToken); // 유저 토큰

  const [likePrmcList, setLikePrmcList] = useState([]); // 좋아하는 공연 목록
  const [favoritePfmc, setFavoritePfmc] = useState([]); // 즐겨찾는 공연 목록

  // 좋아요한 공연 READ
  const getLikePfmc = async () => {
    try {
      const { data } = await axios.get(`${apiKey}/api/likes/mypage/performances`, {headers: {"Content-Type": "application/json", AccessToken: accessToken ? accessToken : undefined, RefreshToken: refreshToken ? refreshToken : undefined}});
      setLikePrmcList(data.data);
      console.log("좋아하는 공연 조회 성공");
    } catch (error) {
      console.error("좋아하는 공연 조회 실패: ", error);
    }
  };

  // 즐겨찾는 공연 READ
  const getFavoritePfmc = async () => {
    try {
      const { data } = await axios.get(`${apiKey}/api/favorite-pfmc/mypage`, {headers: {"Content-Type": "application/json", AccessToken: accessToken ? accessToken : undefined, RefreshToken: refreshToken ? refreshToken : undefined}});
      setFavoritePfmc(data);
      console.log("즐겨찾는 공연 조회 성공");
    } catch (error) {
      console.error("즐겨찾는 공연 조회 실패: ", error);
    }
  };

  useEffect(() => {
    getLikePfmc();
    getFavoritePfmc();
  }, [isAuthenticated, refreshToken, accessToken]);

  return (
    <div>
      <h1 className="m-4 text-center">💜 내가 좋아하는 공연 💜</h1>
      {likePrmcList.length > 0 ? (
        <Carousel infinite={true} centerMode={true} responsive={responsive} autoPlay={true}>
          {likePrmcList.map((item) => {
            return <MyPfmcCard key={item.mt20id} item={item} />;
          })}
        </Carousel>
      ) : (
        <h1 className="m-4 text-center">공연 좋아요를 눌러주세요😥</h1>
      )}

      <h1 className="m-4 text-center">🧡 내가 즐겨찾는 공연 🧡</h1>
      {favoritePfmc.length > 0 ? (
        <Carousel infinite={true} centerMode={true} responsive={responsive} autoPlay={true}>
          {favoritePfmc.map((item) => {
            return <MyPfmcCard key={item.mt20id} item={item} />;
          })}
        </Carousel>
      ) : (
        <h1 className="m-4 text-center">공연 즐겨찾기를 추가해주세요😥</h1>
      )}

      {/* 카카오맵 컴포넌트 */}
      {/* <Map /> */}
    </div>
  );
};

export default MyPage;

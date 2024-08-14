import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useAuthStore from "../zustand/useAuthStore";
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

  const [likePrmcList, setLikePrmcList] = useState([]); // 좋아요한 공연 목록

  // 인가
  const { isAuthenticated } = useAuthStore((state) => {
    return {
      isAuthenticated: state.isAuthenticated,
    };
  });

  // 토큰 유무 확인
  useEffect(() => {
    console.log(isAuthenticated);
  }, []);

  // 좋아요한 공연 조회
  const getLikePfmc = async () => {
    const { data } = await axios.get(`${apiKey}/api/likes/mypage/performances`);
    setLikePrmcList(data.data);
  };

  useEffect(() => {
    getLikePfmc();
  }, []);

  return (
    <div>
      <h3 className="m-4">내가 즐겨찾는 공연</h3>
<<<<<<< HEAD
      <Carousel
        infinite={true}
        centerMode={true}
        responsive={responsive}
        autoPlay={true}
      >
        <div>user</div>
=======
      <Carousel infinite={true} centerMode={true} responsive={responsive} autoPlay={true}>
        {/* {likePrmcList.map((item) => {
          return (
            <MyPfmcCard key={item.mt20id} item={item} />
            );
        })} */}
        <MyPfmcCard />
        <MyPfmcCard />
        <MyPfmcCard />
        <MyPfmcCard />
        <MyPfmcCard />
        <MyPfmcCard />
        <MyPfmcCard />
>>>>>>> 9ecb5c77b36d93c8085825da1cc104f43349993f
      </Carousel>

      {/* 카카오맵 컴포넌트 */}
      {/* <Map /> */}
    </div>
  );
};

export default MyPage;

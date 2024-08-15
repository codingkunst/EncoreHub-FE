import { useEffect, useState } from "react";
import SearchBar from "../components/searchbar/SearchBar";
// import usePrmcStore from "../zustand/usePrmcStore";
import "./HomePage.styled.css";
import axiosInstance from "../api/axiosInstance";
import SlideCard from "../components/carousel/SlideCard";
import Slider from "../components/carousel/Slider";
import { fetchBoxOffPrmcs } from "../api/prmc";
import useAuthStore from "../zustand/useAuthStore";
import { login } from "../api/auth";
import { useFetchFavoritePfmcs } from "../hooks/usePrmcs";
import usePrmcStore from "../zustand/usePrmcStore";

const HomePage = () => {
  const { isAuthenticated, accessToken, refreshToken } = useAuthStore();

  useEffect(() => {
    // console.log("AccessToken:", accessToken);
    // console.log("refreshToken:", refreshToken);
    // console.log("isAuthenticated:", isAuthenticated);
  }, [accessToken, isAuthenticated]);

  return (
    <div>
      <section
        style={{
          height: "calc(100vh - 75px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="flex justify-center flex-col text-center h-full">
          <h1
            className="text-4xl"
            style={{ marginTop: "80px", marginBottom: "30px" }}
          >
            손쉽게 공연장을 찾아보세요!
          </h1>
          <span className="text-1xl mb-8">
            ENCORE HUB는 주변의 공연 정보와 티켓팅 일정을 한눈에 확인할 수 있는
            플랫폼입니다.
            <br /> 관심 있는 공연을 즐겨찾기에 추가하고, 다른 유저들과 의견을
            나눌 수 있습니다.
          </span>
          <SearchBar style={{ margin: "0 auto" }} />
          {/* <div className="slider mt-12">
            <ul className="flex slides">
              {rankedList.map((item) => (
                <li className="slide" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ borderRadius: "4px" }}
                  />
                </li>
              ))}
            </ul>
          </div> */}
        </div>
        <Slider />
      </section>
      <div style={{ margin: "8rem 5rem 5rem 3rem" }}>
        <h1 style={{ fontSize: "2rem", marginLeft: "2rem" }}>
          지금 인기있는 공연
        </h1>
        <SlideCard />
      </div>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useRef } from "react";
import useTheaterStore from "../../zustand/useTheatersStore";
import { useNavigate } from "react-router-dom";

// window 객체에서 kakao를 가져옵니다.
const { kakao } = window;

export default function KakaoMap() {
  const theaters = useTheaterStore((state) => state.theaters); // Zustand에서 theaters를 가져옵니다
  const mapContainer = useRef(null);
  const markers = useRef([]);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  useEffect(() => {
    const loadKakaoMapScript = () => {
      if (!kakao) {
        // Kakao Map API가 로드되지 않았으면 스크립트 로드
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY`;
        script.onload = () => {
          if (kakao) {
            mapscript(); // 스크립트 로드 후에 지도 생성
          } else {
            console.error("Kakao Map API가 로드되지 않았습니다.");
          }
        };
        script.onerror = () => {
          console.error("Kakao Map API 로드 오류");
        };
        document.head.appendChild(script);
      } else {
        mapscript();
      }
    };

    loadKakaoMapScript();
  }, [theaters]); // theaters 배열이 변경될 때마다 지도를 업데이트

  const mapscript = () => {
    // theaters가 배열인지 확인
    if (!Array.isArray(theaters)) {
      console.error("The theaters state is not an array.", theaters);
      return;
    }

    // console.log("Theaters state:", theaters); // 디버깅: theaters 배열 확인

    const container = mapContainer.current;
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 지도 중심좌표
      level: 7,
    };

    // 지도 생성
    const map = new kakao.maps.Map(container, options);

    // 기존 마커 제거
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = []; // 마커 배열 초기화

    // 마커 클릭 핸들러 정의
    const handleMarkerClick = (theaterId) => {
      navigate(`/prmcpage/${theaterId}`); // 페이지 이동
    };

    // 마커 생성 및 지도에 추가
    theaters.forEach((el) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.la, el.lo),
        title: el.fcltynm,
      });

      // 마커 클릭 이벤트 리스너 추가
      kakao.maps.event.addListener(marker, "click", () => {
        handleMarkerClick(el.mt10id); // 클릭 시 페이지 이동
      });

      // 마커를 배열에 추가
      markers.current.push(marker);
    });

    // 지도 중심을 theaters 배열의 첫 번째 위치로 변경 (선택사항)
    if (theaters.length > 0) {
      const firstLocation = new kakao.maps.LatLng(
        theaters[0].la,
        theaters[0].lo
      );
      map.setCenter(firstLocation);
    }
  };

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: "500px", height: "500px", marginTop: "2rem" }}
    ></div>
  );
}

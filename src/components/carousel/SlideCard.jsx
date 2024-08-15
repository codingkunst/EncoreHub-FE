import React, { useEffect } from "react";
import { useFetchBoxOffPrmcs } from "../../hooks/usePrmcs";
import usePrmcStore from "../../zustand/usePrmcStore";
import { fetchBoxOffPrmcs } from "../../api/prmc";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./SlideCard.styled.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5,
    gap: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const SlideCard = ({ boxOffPrmcs }) => {
  const { data: boxOffPrmcs, isLoading, error } = useFetchBoxOffPrmcs();

  useEffect(() => {
    fetchBoxOffPrmcs();
    console.log(boxOffPrmcs);
  }, [fetchBoxOffPrmcs()]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Carousel responsive={responsive} style={{ margin: "0 2rem" }}>
        {boxOffPrmcs &&
          boxOffPrmcs.map((prmcs, index) => (
            <div key={index} style={{ padding: "1rem 1rem 1rem 1rem" }}>
              <img src={`http://www.kopis.or.kr${prmcs.poster}`} />
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default SlideCard;

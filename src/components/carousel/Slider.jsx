import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SlideCard from "./SlideCard";
import "./Slider.styled.css";
import { useFetchBoxOffPrmcs } from "../../hooks/usePrmcs";

const Slider = ({ autoPlay, children }) => {
  const { data: boxOffPrmcs, isLoading, error } = useFetchBoxOffPrmcs();

  const shuffleArray = (arr) => {
    if (arr) {
      const shuffledArray = [...arr];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      return shuffledArray;
    }
  };

  const shuffledBoxOffPrmcs1 = shuffleArray(boxOffPrmcs);
  const shuffledBoxOffPrmcs2 = shuffleArray(boxOffPrmcs);
  const shuffledBoxOffPrmcs3 = shuffleArray(boxOffPrmcs);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    // <Carousel
    //   infinite={true}
    //   centerMode={true}
    //   autoPlay={autoPlay}
    //   responsive={responsive}
    // >
    //   {children}
    // </Carousel>
    <div style={{}}>
      <div
        className=" pb-16 overflow-hidden"
        style={{
          top: 0,
          left: 0,
          position: "absolute",
          zIndex: "-1",
          width: "25%",
          opacity: ".3",
          marginLeft: "3rem",
        }}
      >
        <div className="flex flex-column mb-10 animate-slider1">
          {shuffledBoxOffPrmcs1 &&
            shuffledBoxOffPrmcs1.map((prmcs, index) => (
              <div key={index}>
                <img src={`http://www.kopis.or.kr${prmcs.poster}`} />
              </div>
            ))}
        </div>
      </div>
      <div
        className="  pb-16 overflow-hidden"
        style={{
          top: 0,
          right: 0,
          position: "absolute",
          zIndex: "-1",
          width: "25%",
          opacity: ".3",
          transparent: ".5",
          marginRight: "5rem",
        }}
      >
        <div className="flex flex-column mb-10 animate-slider1">
          {shuffledBoxOffPrmcs2 &&
            shuffledBoxOffPrmcs2.map((prmcs, index) => (
              <div key={index}>
                <img src={`http://www.kopis.or.kr${prmcs.poster}`} />
              </div>
            ))}
        </div>
      </div>
      <div
        className="  pb-16 overflow-hidden"
        style={{
          top: 0,
          left: "50%",
          transform: "translate(-50%)",
          position: "absolute",
          zIndex: "-1",
          width: "25%",
          opacity: ".3",
        }}
      >
        <div className="flex flex-column mb-10 animate-slider2">
          {shuffledBoxOffPrmcs3 &&
            shuffledBoxOffPrmcs3.map((prmcs, index) => (
              <div
                key={index}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img src={`http://www.kopis.or.kr${prmcs.poster}`} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

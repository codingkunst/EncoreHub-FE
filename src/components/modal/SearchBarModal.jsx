import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useFetchRegions,
  useFetchTheaters,
  useFetchFavoriteTheaters,
  useToggleFavoriteTheater,
} from "../../hooks/useTheaters";
import useTheaterStore from "../../zustand/useTheatersStore";
import useAuthStore from "../../zustand/useAuthStore";
import { fetchRegions, fetchTheaters } from "../../api/theaters";
import { getFavoriteTheaters, toggleFavoriteTheater } from "../../api/user";
import Modal from "../modal/Modal";
import { TECollapse } from "tw-elements-react";
import {
  List,
  ListItem,
  RegionList,
  VenueList,
  VenueItem,
  RegionItems,
  StyledRegionWrapper,
  StyledFavWrap,
  StyledFav,
} from "./SearchBarModal.styled";

const SearchBarModal = ({ isVisible, onClose }) => {
  //auth
  const { isAuthenticated, accessToken, refreshToken } = useAuthStore(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
      refreshToken: state.token,
      accessToken: state.accessToken,
    })
  );

  useEffect(() => {
    //   console.log("isAuthenticated:", isAuthenticated);
    //   console.log("accessToken:", accessToken);
    //   console.log("refreshToken:", refreshToken);
    if (isAuthenticated) {
      getFavoriteTheaters();
    }
  }, [isAuthenticated, accessToken, refreshToken]);

  //region
  const {
    data: regions,
    isLoading: isRegionLoading,
    isError: isRegionError,
    error: regionError,
  } = useFetchRegions();
  const {
    regions: storeRegions,
    setRegions,
    setSelectedRegion,
    selectedRegion,
  } = useTheaterStore();

  useEffect(() => {
    if (regions) {
      // console.log("storeRegions:", storeRegions);
      // console.log("regions:", regions);
      setRegions(regions);
    }
  }, [regions, storeRegions]);

  //region - select region to get theaters
  const handleButtonClick = (region, event) => {
    event.preventDefault();
    setSelectedRegion(region);
  };

  //theater
  const {
    data: theaters,
    isLoading: isTheaterLoading,
    isError: isTheaterError,
    error: theaterError,
  } = useFetchTheaters();
  const {
    theaters: storeTheaters,
    setTheaters,
    setSelectedTheater,
  } = useTheaterStore();

  useEffect(() => {
    // console.log("storeTheater:", storeTheaters);
    setTheaters(theaters);
  }, [theaters, storeTheaters]);

  //theater - navigate prmc page
  const navigate = useNavigate();
  const setTheaterClickHandler = (theater) => {
    setSelectedTheater(theater);
    navigate(`/prmcpage/${theater}`);
  };

  //favorite theater

  const { favoriteTheaters, setFavoriteTheaters } = useTheaterStore();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchFavorites = async () => {
        try {
          const favoriteTheaters = await getFavoriteTheaters(
            accessToken,
            refreshToken
          );
          setFavoriteTheaters(favoriteTheaters);
        } catch (error) {
          console.error("Error fetching favorite theaters:", error);
        }
      };

      fetchFavorites();
    }
  }, [isAuthenticated, accessToken, refreshToken, setFavoriteTheaters]);

  //favorite theater - toggle action
  const [activeElement, setActiveElement] = useState("");
  const handleClick = (value) => {
    setActiveElement((prev) => (prev === value ? "" : value));
  };

  //favorite theater - add / remove
  const { mutate: toggleFavorite } = useToggleFavoriteTheater();
  const handleToggleFavoriteTheater = async (theaterId, event) => {
    event.stopPropagation();

    if (isAuthenticated === false) {
      console.log("로그인 후 즐겨찾기 추가");
      return;
    } else {
      try {
        await toggleFavorite(theaterId);
        await new Promise((resolve) => setTimeout(resolve, 100));
        const updatedFavoriteTheaters = await getFavoriteTheaters(
          accessToken,
          refreshToken
        );
        setFavoriteTheaters(updatedFavoriteTheaters); // 상태를 업데이트
        console.log("updateFavoriteTheaters:", updatedFavoriteTheaters);
      } catch (error) {
        console.error(
          "Error toggling favorite theater:",
          error.message || "error"
        );
      }
    }
  };
  useEffect(() => {
    console.log("Favorite theaters updated:", favoriteTheaters);
  }, [favoriteTheaters]);

  const isFavorite = (theaterId) => {
    return favoriteTheaters.some((theater) => theater.theaterId === theaterId);
  };

  //loading / error

  if (isRegionLoading || isTheaterLoading) return console.log("loading");
  if (isRegionError || isTheaterError) return console.log("error");

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <StyledRegionWrapper>
        {/* 즐겨찾기 공연장 */}
        <StyledFavWrap>
          <StyledFav
            onClick={() => handleClick("element1")}
            aria-expanded={activeElement === "element1"}
            aria-controls="collapseOne"
          >
            <span>즐겨찾는 공연장</span>
            <span
              className={`${
                activeElement === "element1"
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529] dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </StyledFav>
          <TECollapse
            show={activeElement === "element1"}
            className="!mt-0 !rounded-b-none !shadow-none"
          >
            <div
              className="px-4 py-3"
              style={{ height: "100px", overflow: "auto" }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <List>
                  {isAuthenticated &&
                  favoriteTheaters &&
                  favoriteTheaters.length > 0 ? (
                    favoriteTheaters.map((theater) => (
                      <VenueItem
                        key={theater.id}
                        className="flex justify-around items-center"
                        onClick={(event) =>
                          setTheaterClickHandler(theater.theaterId, event)
                        }
                        style={{
                          justifyContent: "space-around",
                          cursor: "pointer",
                        }}
                      >
                        <p>{theater.theaterName}</p>
                        <button
                          onClick={(event) =>
                            handleToggleFavoriteTheater(
                              theater.theaterId,
                              event
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={
                              isFavorite(theater.theaterId)
                                ? "rgb(138, 14, 196)"
                                : "none"
                            }
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="rgb(138, 14, 196)"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        </button>
                      </VenueItem>
                    ))
                  ) : (
                    <p>즐겨찾는 공연장을 추가해보세요!</p>
                  )}
                </List>
              </div>
            </div>
          </TECollapse>
        </StyledFavWrap>

        {/* 지역 */}
        <RegionList>
          <ListItem
            style={{
              width: "30%",
              backgroundColor: "rgb(138, 14, 196)",
              color: "rgb(255,255,255)",
            }}
          >
            <button>
              <p>서울</p>
            </button>
          </ListItem>
          <RegionItems style={{ height: "calc(100% - (48px + 2rem))" }}>
            <div>
              {regions.gugunnms.map((region, index) => (
                <ListItem
                  key={index}
                  onClick={(event) => handleButtonClick(region, event)}
                  className="block cursor-pointer rounded-lg p-2 text-left transition duration-500 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200"
                  style={
                    selectedRegion === region
                      ? {
                          backgroundColor: "rgb(138, 14, 196)",
                          color: "rgb(255,255,255)",
                        }
                      : { backgroundColor: "rgb(255,255,255)" }
                  }
                >
                  {region}
                </ListItem>
              ))}
            </div>
          </RegionItems>
        </RegionList>
      </StyledRegionWrapper>

      {/* 공연장 */}
      <div
        style={{
          width: "60%",
          margin: "0 1rem",
          flexGrow: 1,
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: ".75rem 1rem",
            fontSize: ".75rem",
            backgroundColor: "rgb(245,245,245)",
            marginBottom: ".5rem",
            borderRadius: "4px",
          }}
        >
          <p>공연장 별 공연 정보를 확인하세요! (지역 공연장 선택)</p>
          <p>자주 찾는 공연장을 즐겨찾기에 추가할 수 있습니다.</p>
        </div>
        {selectedRegion ? (
          theaters ? (
            <VenueList style={{ marginTop: "3rem" }}>
              {theaters.map((theater) => (
                <VenueItem
                  key={theater.mt10id}
                  className="inline-block rounded px-6 pb-2 pt-2.5 text-s font-medium uppercase leading-normal text-grey shadow-[0_4px_9px_-4px_#ccc] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  style={{ justifyContent: "space-between" }}
                  onClick={(event) =>
                    setTheaterClickHandler(theater.mt10id, event)
                  }
                >
                  <button style={{ marginRight: "5px" }}>
                    {theater.fcltynm}
                  </button>
                  <button
                    onClick={(event) =>
                      handleToggleFavoriteTheater(
                        theater.mt10id,
                        // theater.theaterName,
                        event
                      )
                    }
                  >
                    {!isAuthenticated ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="rgb(245, 245, 245)"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="rgb(245, 245, 245"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={
                          isFavorite(theater.mt10id)
                            ? "rgb(138, 14, 196)"
                            : "none"
                        }
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="rgb(138, 14, 196)"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    )}
                  </button>
                </VenueItem>
              ))}
            </VenueList>
          ) : (
            <p>No theaters available</p>
          )
        ) : (
          <p>원하는 지역을 선택하세요!</p>
        )}
      </div>
    </Modal>
  );
};

export default SearchBarModal;

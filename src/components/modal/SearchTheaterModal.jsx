import { useEffect } from "react";
import {
  useFetchFavoriteTheaters,
  useFetchSearchTheater,
  useToggleFavoriteTheater,
} from "../../hooks/useTheaters";
import useTheaterStore from "../../zustand/useTheatersStore";
import Modal from "../modal/Modal";
import { VenueItem, VenueList } from "./SearchBarModal.styled";
import {
  StyledSearchModalWrap,
  StyledSearchTitle,
} from "./SearchTheaterModal.styled";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/useAuthStore";
import { getFavoriteTheaters } from "../../api/user";

const SearchTheaterModal = ({ isVisible, onClose, searchText }) => {
  const {
    data: searchTheater,
    isLoading,
    isError,
    error,
  } = useFetchSearchTheater();

  const {
    searchTheaters,
    setSearchTheaters,
    searchTheaterName,
    setSearchTheaterName,
    setSelectedTheater,
  } = useTheaterStore((state) => ({
    setSearchTheaters: state.setSearchTheaters,
    searchTheaters: state.searchTheaters,
    searchTheaterName: state.searchTheaterName,
    setSearchTheaterName: state.setSearchTheaterName,
    setSelectedTheater: state.setSelectedTheater,
  }));

  useEffect(() => {
    // console.log(searchTheater);
  });

  const navigate = useNavigate();

  const setTheaterClickHandler = (theater) => {
    setSelectedTheater(theater);
    onClose();

    navigate(`/prmcpage/${theater}`);
  };

  const { isAuthenticated, accessToken, refreshToken } = useAuthStore(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
      refreshToken: state.refreshToken,
      accessToken: state.accessToken,
    })
  );

  useEffect(() => {
    //   console.log("isAuthenticated:", isAuthenticated);
    //   console.log("accessToken:", accessToken);
    //   console.log("refreshToken:", refreshToken);
  }, [isAuthenticated, accessToken, refreshToken]);

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

  //favorite theater - add / remove
  const { mutate: toggleFavorite } = useToggleFavoriteTheater();
  const handleToggleFavoriteTheater = async (theaterId, event) => {
    event.stopPropagation();

    if (isAuthenticated === false) {
      alert("로그인 후 즐겨찾기 추가가 가능합니다.");
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
        // console.log("updateFavoriteTheaters:", updatedFavoriteTheaters);
      } catch (error) {
        console.error(
          "Error toggling favorite theater:",
          error.message || "error"
        );
      }
    }
  };
  useEffect(() => {
    // console.log("Favorite theaters updated:", favoriteTheaters);
  }, [favoriteTheaters]);

  const isFavorite = (theaterId) => {
    return favoriteTheaters.some((theater) => theater.mt10id === theaterId);
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      style={{ overflow: "hidden" }}
    >
      <StyledSearchModalWrap>
        <StyledSearchTitle>
          <h1>'{searchText}'에 대한 공연장 검색 결과</h1>
        </StyledSearchTitle>
        <VenueList>
          {searchTheaterName &&
            searchTheater &&
            searchTheater.theaters.map((theater) => (
              <VenueItem
                key={theater.mt10id}
                className="inline-block rounded px-6 pb-2 pt-2.5 text-s font-medium uppercase leading-normal text-grey shadow-[0_4px_9px_-4px_#ccc] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={(event) => {
                  setTheaterClickHandler(theater.mt10id, event);
                }}
              >
                <button style={{ marginRight: "5px" }}>
                  {theater.fcltynm}
                </button>
                <button
                  onClick={(event) =>
                    handleToggleFavoriteTheater(theater.mt10id, event)
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
      </StyledSearchModalWrap>
    </Modal>
  );
};

export default SearchTheaterModal;

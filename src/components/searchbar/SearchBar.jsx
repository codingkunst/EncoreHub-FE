import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBarModal from "../modal/SearchBarModal";
import { SearchBarContainer, SearchInput, Button } from "./SearchBar.styled";
import useTheaterStore from "../../zustand/useTheatersStore";
import SearchTheaterModal from "../modal/SearchTheaterModal";

const SearchBar = () => {
  //modal
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "auto";
      return !prev;
    });
  };

  const [isSearchModalVisible, setSearchModalVisible] = useState(false);

  const toggleSearchModal = () => {
    setSearchModalVisible((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "auto";
      return !prev;
    });
  };

  const {
    searchTheaters,
    setSearchTheaters,
    searchTheaterName,
    setSearchTheaterName,
  } = useTheaterStore((state) => ({
    setSearchTheaters: state.setSearchTheaters,
    searchTheaters: state.searchTheaters,
    searchTheaterName: state.searchTheaterName,
    setSearchTheaterName: state.setSearchTheaterName,
  }));

  const handleButtonClick = (theater) => {
    setSearchTheaterName(theater);
    toggleSearchModal();
    // console.log(theater, searchTheaterName);
  };

  //search
  const [searchInput, setsearchInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const searchVenue = useTheaterStore((state) => state.searchVenues); // Zustand 훅 사용

  const handleSearch = () => {
    if (searchInput.trim()) {
      const results = searchVenue(searchInput);
      if (results.length > 0) {
        navigate(`/prmcpage/query=${searchInput}`, {
          state: { venues: results }, // 검색 결과를 상태로 전달
        });
      } else {
        setError("검색 결과가 없습니다.");
      }
    }
  };

  return (
    <>
      <SearchBarContainer style={{ margin: "0 auto" }}>
        <Button onClick={toggleModal}>☰</Button>
        <SearchInput
          placeholder="공연장 검색하기"
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
        />
        <Button
          onClick={() => {
            handleButtonClick(searchInput);
          }}
        >
          Search
        </Button>
      </SearchBarContainer>
      <SearchBarModal isVisible={isModalVisible} onClose={toggleModal} />
      <SearchTheaterModal
        isVisible={isSearchModalVisible}
        onClose={toggleSearchModal}
        searchText={searchInput}
      />
      {error && (
        <div className="error-popup">
          <p>{error}</p>
          <Button onClick={() => setError("")}>닫기</Button>
        </div>
      )}
    </>
  );
};

export default SearchBar;

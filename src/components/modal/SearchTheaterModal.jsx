import { useEffect } from "react";
import { useFetchSearchTheater } from "../../hooks/useTheaters";
import useTheaterStore from "../../zustand/useTheatersStore";
import Modal from "../modal/Modal";
import { VenueItem, VenueList } from "./SearchBarModal.styled";
import {
  StyledSearchModalWrap,
  StyledSearchTitle,
} from "./SearchTheaterModal.styled";

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
  } = useTheaterStore((state) => ({
    setSearchTheaters: state.setSearchTheaters,
    searchTheaters: state.searchTheaters,
    searchTheaterName: state.searchTheaterName,
    setSearchTheaterName: state.setSearchTheaterName,
  }));

  useEffect(() => {
    console.log(searchTheater);
  });

  if (isLoading || isLoading) return <p>Loading...</p>;
  if (isError || isError) return <p>Error: {error.message}</p>;

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
            searchTheater.theaters.map((theater) => (
              <VenueItem key={theater.mt10id}>{theater.fcltynm}</VenueItem>
            ))}
        </VenueList>
      </StyledSearchModalWrap>
    </Modal>
  );
};

export default SearchTheaterModal;

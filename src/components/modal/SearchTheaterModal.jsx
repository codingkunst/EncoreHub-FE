import { useEffect } from "react";
// import { useFetchSearchTheater } from "../../hooks/useTheaters";
import useTheaterStore from "../../zustand/useTheatersStore";
import Modal from "../modal/Modal";
import { VenueItem, VenueList } from "./SearchBarModal.styled";
import {
  StyledSearchModalWrap,
  StyledSearchTitle,
} from "./SearchTheaterModal.styled";

const SearchTheaterModal = ({ isVisible, onClose, searchText }) => {
  // const {
  //   data: searchTheater,
  //   isLoading,
  //   isError,
  //   error,
  // } = useFetchSearchTheater();

  // const { theater, setSearchTheater } = useTheaterStore((state) => ({
  //   theater: state.searchTheater,
  //   setSearchTheater: state.setSearchTheater,
  // }));

  // useEffect(() => {
  //   theater;
  //   console.log(searchTheater, theater);
  // });

  // if (isLoading || isLoading) return <p>Loading...</p>;
  // if (isError || isError) return <p>Error: {error.message}</p>;

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
          {/* {searchTheater.map((theater) => (
            <VenueItem key={theater.id}>{theater.venue}</VenueItem>
          ))} */}
        </VenueList>
      </StyledSearchModalWrap>
    </Modal>
  );
};

export default SearchTheaterModal;

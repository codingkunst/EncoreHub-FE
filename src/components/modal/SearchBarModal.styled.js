import styled from "styled-components";
import tw from "tailwind-styled-components";

export const StyledRegionWrapper = styled.div`
  border-radius: 0.75rem;
  height: 100%;
  display: flex;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background-color: rgb(245, 245, 245);
  padding: 1rem;
  min-width: calc(240px + 1rem);
  flex-direction: column;
`;

export const StyledFavWrap = tw.div`
  rounded-lg 
  dark:border-neutral-600 
  dark:bg-neutral-800
  mb-4
`;

export const StyledFav = tw.button`
  group 
  relative 
  flex 
  w-full 
  items-center  
  border-0 
  bg-main-color
  rounded-lg	
  px-5 
  py-3 
  text-left 
  text-base 
  text-white
  transition 
  [overflow-anchor:none] 
  hover:z-[2] 
  focus:z-[3] 
  focus:outline-none 
  dark:bg-neutral-800 
  dark:text-white
`;

export const FavoriteList = styled.div`
  background: none;
  border: none;
  font-size: 1rem;
  margin-bottom: 1rem;
  min-width: 15%;
`;

export const Button = styled.button`
  border: none;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  /* flex-basis: fit-content; */
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: ${(props) => (props.disabled ? "#666" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
`;

export const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.5rem;
  display: flex;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0.75rem 1.2rem;
  margin: 0 1rem 0.5rem 0;
  width: auto;
  text-align: left;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
  background-color: rgb(255, 255, 255);
`;

export const RegionList = styled.div`
  display: flex;
  align-items: flex-start;
  max-height: 100%;
  margin-bottom: 1rem;
  /* width: 20%; */
  min-width: 20%;
  justify-content: space-evenly;
  height: 100%;
`;
export const RegionItems = styled.div`
  overflow-y: auto;
  height: 100%;
  &::-webkit-scrollbar {
    width: 8px;
    margin: 0 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
`;
export const VenueList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-height: 400px; /* 원하는 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
  width: 100%;
  justify-content: space-evenly;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
`;

export const VenueItem = styled.div`
  /* flex: 1 0 calc(30% - 1rem); */
  box-sizing: border-box;
  /* background-color: #e9ecef; */
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
  display: flex;
  flex-grow: 0;
  justify-content: center;
  border: 1px solid #ccc;
  min-width: 200px;
`;

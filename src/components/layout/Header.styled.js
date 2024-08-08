import styled, { keyframes, css } from "styled-components";
import tw from "tailwind-styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  /* background-color: #f8f9fa; */
  border-bottom: 1px solid #e9ecef;
  width: 100%;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

export const HeaderContains = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTicketAlert = styled.button`
  /* border: 3px solid rgb(245, 245, 245); */
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  border-radius: 50%;
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(0); }
  75% { transform: translateX(2px); }
  100% { transform: translateX(0); }
`;

export const StyledBellIcon = styled.svg`
  animation: ${(props) =>
    props.$shake &&
    css`
      ${shake} 0.5s infinite
    `};
`;

export const Nav = styled.nav`
  gap: 0.5rem;
`;

export const StyledButton = tw.button`
  inline-block 
  rounded-full 
  px-6 
  pb-2 
  pt-2.5 
  text-s 
  font-medium 
  uppercase 
  leading-normal 
  text-grey 
  shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
  transition 
  duration-150 
  ease-in-out 
  hover:bg-primary-600 
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
  focus:bg-primary-600 f
  ocus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
  focus:outline-none 
  focus:ring-0 
  active:bg-primary-700 
  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
  dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
  dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
  dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
  dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
`;

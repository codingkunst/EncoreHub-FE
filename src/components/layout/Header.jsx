import { Link, useLocation } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import {
  HeaderContainer,
  HeaderContains,
  Logo,
  Nav,
  StyledTicketAlert,
  StyledButton,
  StyledBellIcon,
} from "./Header.styled";
import useAuthStore from "../../zustand/useAuthStore";
import { useState } from "react";
import { set } from "react-hook-form";
import TicketAlertModal from "../modal/TicketAlertModal";

const Header = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  const { isAuthenticated, logout } = useAuthStore();

  const [open, setOpen] = useState(false);
  const [shake, setShake] = useState(true);

  const handleAlertClick = () => {
    setOpen(!open);
    setShake(false);
  };

  // console.log(isAuthenticated);

  const pathData = !shake
    ? "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
    : "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5";

  return (
    <div>
      <HeaderContainer>
        <Link to={"/"} style={{ width: "20%" }}>
          <Logo>Encore Hub</Logo>
        </Link>
        {!isHomePage && <SearchBar />}
        <HeaderContains>
          {/* {isAuthenticated && (
            <StyledTicketAlert
              className="transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md hover:scale-105 cursor-pointer"
              onClick={handleAlertClick}
              // styled={isAuthenticated ? { display: "flex" } : { display: "none" }}
            >
              <StyledBellIcon
                xmlns="http://www.w3.org/2000/svg"
                fill={!shake ? "none" : "rgb(138,14,196)"}
                viewBox="0 0 24 24"
                strokeWidth={1.7}
                stroke="rgb(138,14,196)"
                className="size-7"
                $shake={shake}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={pathData}
                />
              </StyledBellIcon>
            </StyledTicketAlert>
          )} */}
          <Nav>
            {!isAuthenticated ? (
              <div>
                <Link to={"/login"}>
                  <StyledButton
                    style={{ backgroundColor: "#f8f9fa", marginRight: ".5rem" }}
                  >
                    로그인
                  </StyledButton>
                </Link>
                <Link to={"/signup"}>
                  <StyledButton
                    style={{
                      backgroundColor: "rgb(138, 14, 196)",
                      color: "#fff",
                    }}
                  >
                    회원가입
                  </StyledButton>
                </Link>
              </div>
            ) : (
              <div>
                <StyledButton
                  onClick={logout}
                  style={{ backgroundColor: "#f8f9fa", marginRight: ".5rem" }}
                >
                  로그아웃
                </StyledButton>
                <Link to={"/mypage"}>
                  <StyledButton
                    style={{
                      backgroundColor: "rgb(138, 14, 196)",
                      color: "#fff",
                    }}
                  >
                    마이페이지
                  </StyledButton>
                </Link>
              </div>
            )}
          </Nav>
        </HeaderContains>
      </HeaderContainer>
      {/* <TicketAlertModal open={open} onClose={setOpen} /> */}
    </div>
  );
};

export default Header;

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";

import { TbMenu2 } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import SmallScreenSidebar from "./SmallScreen/SmallScreenSidebar";
import { useEffect, useState } from "react";

const MenuIcon = styled(TbMenu2)`
  cursor: pointer;
  font-size: 40px;
  @media (min-width: 768px) {
    display: none;
  }
`;
const Container = styled.div`
margin-bottom: 10px;
`
const SearchIcon = styled(IoIosSearch)`
  cursor: pointer;
  font-size: 25px;
  position: absolute;
  margin-left: 5px;
`;


export default function NavBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isHomeOpen, setHomeIsOpen] = useState(false);
  const location = useLocation();

  const [title, setTitle] = useState("")

  

  useEffect(() => {
    if(location.pathname === '/') {
      setTitle('All Songs')
    }
    else if(location.pathname === '/genre') {
      setTitle('Genre')
    }
    else if(location.pathname === '/addSong') {
      setTitle('Add Song')
    }
    else if(location.pathname === '/Statistics') {
      setTitle('Overview')
    }
    else if(location.pathname.startsWith('/editSong/')) {
      setTitle('Edit Song')
    }
  }, [location.pathname])

  const SearchContainer1 = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  display: ${location.pathname === "/" ? "flex" : "none"};
  @media (max-width: 530px) {
    display: none;
  }
`;
const SearchContainersecond = styled.div`
  position: relative;
  display: none;
  align-items: center;
  display: ${location.pathname === "/" ? "flex" : "none"};
  @media (min-width: 530px) {
    display: none;
  }
`;

  const NavStyle = css`
    // background: #1F3044;
    background: #F7F7F7;
    margin-top: 10px;
    padding: 10px 0px;
    border-radius: 10px;
    position: sticky;
    top: 0;
    height: 70px;
    z-index: 20;
    gap: 20px;
  `;
  const SearchStyleInput = styled.input`
    padding: 8px 32px;

    /* Add playful spirit: */
    background-color: #f0f8ff;
    border: 1px solid #c0c0ff;
    font-size: 16px;
    outline: none;
    box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
    transition: 0.2s ease-in-out;
    border-radius: 5px; /* Rounded corners */
    width: 200px;

    @media (max-width: 768px) {
      width: 100%;
    }

    &:focus {
      box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
      border-color: #9090ff;
    }
  `;
  useEffect(() => {
    setTimeout(() => {
      setHomeIsOpen(false);
      setOpen(false);
    }, 300);
  }, [isHomeOpen]);

  function close() {
    setOpen(false);
  }
  function closeHome() {
    navigate("/");
    setHomeIsOpen(true);
  }

  return (
    <>
      {/* Nav bar */}
      <SmallScreenSidebar
        openMobileNav={open}
        onClick={close}
        onClickHome={closeHome}
      />
      <Container>
      <Flex
        css={NavStyle.styles}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontSize={5} fontWeight="bold">
            {title}
          </Text>
        <Box>
          
          <SearchContainer1
          >
            <SearchIcon />
            <SearchStyleInput
              type="text"
              placeholder="Search your Songs here..."
            />
          </SearchContainer1>
        </Box>
        <MenuIcon onClick={() => setOpen(true)} />
      </Flex>
      <SearchContainersecond
          >
            <SearchIcon />
            <SearchStyleInput
              type="text"
              placeholder="Search your Songs here..."
            />
          </SearchContainersecond>
          </Container>
    </>
  );
}

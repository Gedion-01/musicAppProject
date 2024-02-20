import { BiCategory } from "react-icons/bi";
import { IoIosClose, IoMdHome } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";

import { Link, useLocation } from "react-router-dom";
import React from "react";

import MusicLogo from "../../assets/Music.svg"
//
//import { Outlet } from "react-router-dom";

const StyledIcon = styled(IoMdHome)`
  margin-right: 10px;
  font-size: 30px;
`;
const StyledIcon2 = styled(BiCategory)`
  margin-right: 10px;
  font-size: 30px;
`;
const StyledIcon3 = styled(IoStatsChart)`
  margin-right: 10px;
  font-size: 30px;
`;
const StyledIcon4 = styled(IoIosAddCircleOutline)`
  margin-right: 10px;
  font-size: 30px;
`;

const Overlay = styled.div<{ openMobileNav: boolean }>`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.openMobileNav ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const CloseIcon = styled(IoIosClose)`
  cursor: pointer;
  font-size: 50px;
`;
type myComponentProp = {
  openMobileNav: boolean;
  onClick: () => void;
  onClickHome: () => void;
};

const SmallScreenSidebar: React.FC<myComponentProp> = ({
  openMobileNav,
  onClick,
  onClickHome,
}) => {
  const location = useLocation();
  const sideBarStyle = css`
    position: fixed;
    top: 0;
    left: ${openMobileNav ? "0px" : "-250px"};
    z-index: 40;
    width: 250px;
    height: 100vh;

    //  background: #a8bcc3;
    background: #7DA2A9;
    transition: all 0.1;
    font-weight: bolder;
  `;
  const sideBarElement = css`
    font-size: 20px;
    color: #1f3044;
    padding: 7px;
    margin: 5px 16px;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      color: #F7F7F7;
      background-color: #01345B;
    }
    transition: 0.4s;
  `;

  const MusicImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
`
  const menu = css`
    padding: 0px 10px;
  `;
  return (
    <>
      <Overlay openMobileNav={openMobileNav} onClick={onClick}></Overlay>
      <Flex
        onClick={(e) => e.stopPropagation()}
        flexDirection={"column"}
        css={sideBarStyle.styles}
      >
        <Flex
          flexDirection={"row"}
          justifyContent="space-between"
          alignItems="center"
          css={menu.styles}
        >
          <Box>
          <MusicImage src={MusicLogo} />
          </Box>
          <Box>
            <CloseIcon onClick={onClick} />
          </Box>
        </Flex>

        <Flex
          flexDirection={"row"}
          alignItems="center"
          onClick={onClickHome}
          css={sideBarElement.styles}
          style={{ color: location.pathname === "/" ? "#F7F7F7" : "", backgroundColor: location.pathname === "/" ? "#01345B" : "" }}
        >
          <Box>
            <StyledIcon />
          </Box>
          <Box>
            <Text>Home</Text>
          </Box>
        </Flex>

        <Link to={"/genre"}>
          <Flex
            flexDirection={"row"}
            alignItems="center"
            onClick={onClick}
            css={sideBarElement.styles}
            style={{ color: location.pathname === "/genre" ? "#F7F7F7" : "", backgroundColor: location.pathname === "/genre" ? "#01345B" : "" }}
          >
            <Box>
              <StyledIcon2 />
            </Box>
            <Box>
              <Text>Genre</Text>
            </Box>
          </Flex>
        </Link>
        <Link to={"/addSong"}>
          <Flex
            flexDirection={"row"}
            alignItems="center"
            onClick={onClick}
            css={sideBarElement.styles}
            style={{ color: location.pathname === "/addSong" ? "#F7F7F7" : "", backgroundColor: location.pathname === "/addSong" ? "#01345B" : "" }}
          >
            <Box>
              <StyledIcon4 />
            </Box>
            <Box>
              <Text>Add Songs</Text>
            </Box>
          </Flex>
        </Link>
        <Link to={"/Statistics"}>
          <Flex
            flexDirection={"row"}
            alignItems="center"
            css={sideBarElement.styles}
            onClick={onClick}
            style={{
              color: location.pathname === "/Statistics" ? "#F7F7F7" : "", backgroundColor: location.pathname === "/Statistics" ? "#01345B" : ""
            }}
          >
            <Box>
              <StyledIcon3 />
            </Box>
            <Box>
              <Text>Statistics</Text>
            </Box>
          </Flex>
        </Link>
      </Flex>
    </>
  );
};

export default SmallScreenSidebar;

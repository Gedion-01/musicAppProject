import { BiCategory } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import MusicLogo from "../assets/Music.svg"
// Styled component should be defined outside of the component function
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";

import { Link, useLocation } from "react-router-dom";
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

export default function SideBar() {
  const location = useLocation();
  const sideBarStyle = css`
    height: 100vh;
    position: sticky;
    top: 0;

    width: 250px;

    //  background: #a8bcc3;
    background: #7DA2A9;
    transition: all 0.5s ease;
    font-weight: bolder;

    @media (max-width: 768px) {
      display: none;
    }
  `;
  const MusicImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 10px;
  `
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

  const menu = css`
    padding: 0px 10px;
  `;
  return (
    <>
      <Flex flexDirection={"column"} css={sideBarStyle.styles}>
        <Flex
          flexDirection={"row"}
          justifyContent="space-between"
          alignItems="center"
          css={menu.styles}
        >
          <Box>
          <MusicImage src={MusicLogo} />
          </Box>
        </Flex>
        <Link to={"/"}>
          <Flex
            flexDirection={"row"}
            alignItems="center"
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
        </Link>
        <Link to={"/genre"}>
          <Flex
            flexDirection={"row"}
            alignItems="center"
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
}

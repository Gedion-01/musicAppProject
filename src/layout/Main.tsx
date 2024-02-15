import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box } from "rebass";
import NavBar from "../components/NavBar";
import MyAudioPlayer from "../components/MyAudioPlayer";

export default function Main() {
  const MainStyle = css`
    padding: 0px 15px;
    @media screen and (min-width: 768px) {
      gap: 15px; /* Adjust width for larger screens */
      padding: 0px;
      padding-right: 15px;
    }
  `;

  const OutletContainer = styled(Box)`
    height: calc(100vh - 190px); /* Adjust the height as needed */
    overflow-y: auto; /* Enable scrolling if content exceeds container height */
    scrool: smooth;
  `;

  const PlayerContainer = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #1f3044;
  `;

  return (
    <>
      <Flex css={MainStyle.styles} alignItems={""}>
        <Box>
          <SideBar />
        </Box>
        <Box flex={2}>
          <NavBar />
          <OutletContainer>
            <Outlet />
          </OutletContainer>
        </Box>
      </Flex>
      <PlayerContainer>
        <MyAudioPlayer
          imageUrl="https://th.bing.com/th/id/OIP.keIG-gLYH4XdTkLvAFqI2QHaEo?rs=1&pid=ImgDetMain"
        />
      </PlayerContainer>
    </>
  );
}

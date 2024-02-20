import SideBar from "../components/SideBar";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box } from "rebass";
import NavBar from "../components/NavBar";
import MyAudioPlayer from "../components/MyAudioPlayer";
import React, { ReactNode } from "react";

const Main: React.FC<{ children: ReactNode }> = ({ children }) => {
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
  overflow-x: hidden;
  scroll-behavior: smooth; /* Add smooth scrolling behavior */

  @media (max-width: 768px) {
    height: calc(100vh - 190px); /* Adjust for smaller screens */
  }

  @media (max-width: 480px) {
    height: calc(100vh - 250px); /* Adjust for even smaller screens */
  }
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
      <Flex css={MainStyle.styles}>
        <Box>
          <SideBar />
        </Box>
        <Box flex={2}>
          <NavBar />
          <OutletContainer>{children}</OutletContainer>
        </Box>
      </Flex>
      <PlayerContainer>
        <MyAudioPlayer />
      </PlayerContainer>
    </>
  );
};

export default Main;
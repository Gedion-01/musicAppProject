import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";

import NavBar from "../components/NavBar";

import MyAudioPlayer from "../components/MyAudioPlayer";
import { useAudioplayer } from "../hooks/useAudioPlayer";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export default function Main() {
  const currentData: any = useSelector(
    (state: RootState) => state.playerData.currentData
  );
  const currentTrackIndex = useSelector(
    (state: RootState) => state.playerData.currentTrackIndex
  );
  const playList = useSelector(
    (state: RootState) => state.playerData.playerQueue
  );
  const { methods, stateValue, refs } = useAudioplayer();
  const {audioRef, progressBarRef} = refs;
  const { currentTime } = stateValue;
  const { handlePlayPause, setCurrentTime } = methods;
  console.log(currentTime)
  const MainStyle = css`
    padding: 0px 15px;
    @media screen and (min-width: 768px) {
      gap: 15px; /* Adjust width for larger screens */
      padding: 0px;
      padding-right: 15px;
    }
  `;

  const contentStyle = css`
    color: black;
    height: 100vh;
    border-radius: 10px;
  `;

  const OutletContainer = styled(Box)`
    height: calc(100vh - 200px); /* Adjust the height as needed */
    overflow-y: auto; /* Enable scrolling if content exceeds container height */
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
      <MyAudioPlayer
        artist={currentData.artist}
        title={currentData.title}
        imageUrl="https://th.bing.com/th/id/OIP.keIG-gLYH4XdTkLvAFqI2QHaEo?rs=1&pid=ImgDetMain"
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        currentTrackIndex={currentTrackIndex}
        data={playList}
        handlePlayPause={handlePlayPause}
        songDataUrl={currentData.songDataUrl}
        changeRange={"a"}
        audioRef={audioRef}
        progressBarRef={progressBarRef}
      />
    </>
  );
}

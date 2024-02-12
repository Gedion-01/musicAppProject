import React, { useRef } from "react";

import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";

import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { BiPlayCircle, BiPauseCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";


const StyledRange = styled.input`
input[type=range] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type=range]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -14px;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #367ebd;
  }
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type=range]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type=range]::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type=range]::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type=range]::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: #3071a9;
  }
  input[type=range]:focus::-ms-fill-upper {
    background: #367ebd;
  }
`;

const StyledImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Play = styled(BiPlayCircle)`
  cursor: pointer;
  font-size: 40px;
`;

const Pause = styled(BiPauseCircle)`
  cursor: pointer;
  font-size: 40px;
`;

const Prev = styled(BiSkipPrevious)`
  cursor: pointer;
  font-size: 40px;
`;
const Next = styled(BiSkipNext)`
  cursor: pointer;
  font-size: 40px;
`;
interface myComponentProp {
    title: string;
    artist: string;
    imageUrl: string;
    currentTime: number;
    duration: number;
    data: [];
    handlePlayPause: () => void;
    currentTrackIndex: number;
    songDataUrl: any;
    audioRef: any;
    changeRange: any
}
//https://th.bing.com/th/id/OIP.keIG-gLYH4XdTkLvAFqI2QHaEo?rs=1&pid=ImgDetMain
const MyAudioPlayer: React.FC<myComponentProp> = ({title, artist, imageUrl, currentTime, duration, data, handlePlayPause, currentTrackIndex, songDataUrl, changeRange, audioRef}) => {
    const isPlaying = useSelector(
        (state: RootState) => state.playerData.isPlaying
      );
  const MainDiv = styled.div`
    position: fixed;
    z-index: 10;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1F3044;
    color: #a8bcc3;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 17vh;
    gap: 20px;
  `;
  return (
    <MainDiv>
      <Flex flexDirection={"row"} alignItems={"center"}>
        <Prev />
        <Box onClick={handlePlayPause}>
        {isPlaying ? (
                <Pause />
              ) : (
                <Play />
              )}
              </Box>
        <Next />
      </Flex>
      <audio ref={audioRef} src={songDataUrl} />
      <Flex
        flexDirection="row"
        alignItems="center"
        style={{ width: "500px", gap: "10px" }}
      >
        <Text>{currentTime}</Text>
        <StyledRange type="range" />
        <Text>{duration}</Text>
      </Flex>
      <Flex flexDirection={"row"} alignItems={"center"}>
        <StyledImage src={imageUrl} />
      </Flex>
      <Flex flexDirection={"column"} alignItems={"flex-start"} css={'width: 200px;'}>
        <Text fontSize={2} fontWeight={"bold"}>
          {title}
        </Text>
        <Text>{artist}</Text>
      </Flex>
    </MainDiv>
  );
}

export default MyAudioPlayer;

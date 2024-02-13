import React, { useEffect, useRef, useState } from "react";
import { audioPlayer, animationRef } from "../hooks/audioPlayerRefs";

import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";

import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { BiPlayCircle, BiPauseCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { setIsPlaying, setPlayNext } from "../state/songs/playerSlice";

import styles from '../styles/AudioPlayer.module.css'

const StyledRange = styled.input`
  input[type="range"] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
  }
  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type="range"]::-webkit-slider-thumb {
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
  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #367ebd;
  }
  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type="range"]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type="range"]::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type="range"]::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type="range"]::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type="range"]::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type="range"]:focus::-ms-fill-lower {
    background: #3071a9;
  }
  input[type="range"]:focus::-ms-fill-upper {
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
  imageUrl: string;
}
//https://th.bing.com/th/id/OIP.keIG-gLYH4XdTkLvAFqI2QHaEo?rs=1&pid=ImgDetMain
const MyAudioPlayer: React.FC<myComponentProp> = ({
  imageUrl,
}) => {
  const [counter, setCounter] = useState(0)
  const dispatch = useDispatch()
  // global state
  const isPlaying = useSelector(
    (state: RootState) => state.playerData.isPlaying
  );
  const playNext = useSelector((state: RootState) => state.playerData.playNext);
  const currentPlayerTime = useSelector(
    (state: RootState) => state.playerData.currentPlayerTime
  );
  const currentTrackIndex = useSelector(
    (state: RootState) => state.playerData.currentTrackIndex
  );
  const playList = useSelector(
    (state: RootState) => state.playerData.playerQueue
  );
  const currentData: any = useSelector(
    (state: RootState) => state.playerData.currentData
  );
  // state
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0)
  // refs
  // const audioPlayer = useRef<HTMLAudioElement>(null!)
  const progressBar = useRef<HTMLInputElement>(null!)
  // const animationRef = useRef<number>(null!)

  useEffect(() => {
    console.log('here')
    const seconds = Math.floor(audioPlayer?.current?.duration)
    console.log(seconds);
    
    progressBar.current.max = String(seconds);
    setDuration(seconds)
  }, [audioPlayer?.current?.onloadedmetadata, audioPlayer?.current?.readyState])

  
  function calculateTime(secs: number) {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      console.log("was playing");
      audioPlayer?.current?.pause();
      dispatch(setIsPlaying(false));
      dispatch(setPlayNext(false));
      // cancel the animation which is called while playing
      cancelAnimationFrame(Number(animationRef.current));
    } else {
      //audioRef?.current?.play();
      dispatch(setIsPlaying(true));
      dispatch(setPlayNext(true));
    }
  };
  // function whilePlaying() {
  //   progressBar.current.value = String(audioPlayer?.current?.currentTime);
  //   if (audioPlayer.current) {
  //     setCurrentTime(Number(progressBar.current.value));
  //   }

  //   animationRef.current = requestAnimationFrame(whilePlaying);
  
  //   if (audioPlayer?.current?.ended) {
  //     cancelAnimationFrame(animationRef.current);
  //   }
  // }
  function whilePlaying() {
    const currentTime = audioPlayer.current.currentTime;
  //const duration = audioPlayer.current.duration;
  progressBar.current.value = currentTime;
  setCurrentTime(currentTime);
  
    animationRef.current = requestAnimationFrame(whilePlaying);
  
    if (audioPlayer.current && audioPlayer.current.ended) {
      cancelAnimationFrame(animationRef.current);
    }
  }
  
  // useEffect(() => {
  //   if (audioPlayer.current) {
  //     if (playNext) {
  //       dispatch(setIsPlaying(true));
  //       audioPlayer.current.play();
  //       console.log("next-------------");
  //       animationRef.current = requestAnimationFrame(whilePlaying);
  //     } else {
  //       //audioPlayer.current.pause()
  //       // console.log("cancel;");
  //       // cancelAnimationFrame(Number(animationRef?.current));
  //     }
  //   }
  // }, [currentData._id, isPlaying]);
  useEffect(() => {
    if (audioPlayer.current) {
      if (playNext) {
        dispatch(setIsPlaying(true));
        // Pause the current song if it's playing
        if (isPlaying) {
          audioPlayer.current.pause();
        }
        // Set the new song and play it
        audioPlayer.current.currentTime = 0;
        audioPlayer.current.play();
        console.log("next-------------");
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        // Stop playing the current song
        //dispatch(setIsPlaying(false));
        //audioPlayer.current.pause();
        //cancelAnimationFrame(animationRef.current);
      }
    }
  }, [currentData._id, isPlaying, playNext]);
  

  function changeRange() {
    audioPlayer.current.currentTime = Number(progressBar.current.value)
  }
  
  const MainDiv = styled.div`
    position: fixed;
    z-index: 10;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1f3044;
    color: #a8bcc3;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 17vh;
    gap: 20px;
  `;
  return (
    <>
    
    <audio ref={audioPlayer} src={currentData.songDataUrl} preload="metadata"/>
    <MainDiv>
      <Flex flexDirection={"row"} alignItems={"center"}>
        <Prev />
        <Box onClick={handlePlayPause}>{isPlaying ? <Pause /> : <Play />}</Box>
        <Next />
      </Flex>
      
      <Flex
        flexDirection="row"
        alignItems="center"
        style={{ width: "500px", gap: "10px" }}
      >
        <Text>{calculateTime(currentTime)}</Text>
        {/* <input type="range"defaultValue="0" ref={progressBar} onChange={changeRange} /> */}
        <input type="range"defaultValue="0" className={styles.progressBar} ref={progressBar} max={duration} onChange={changeRange} style={{width: '100%'}}/>
        {/* <StyledRange type="range" ref={progressBar} defaultValue={0} onChange={changeRange}/> */}
        <Text>{duration > 0 ? calculateTime(duration) : "0:00"}</Text>
      </Flex>
      <Flex flexDirection={"row"} alignItems={"center"}>
        <StyledImage src={imageUrl} />
      </Flex>
      <Flex
        flexDirection={"column"}
        alignItems={"flex-start"}
        css={"width: 200px;"}
      >
        <Text fontSize={2} fontWeight={"bold"}>
          {currentData.title}
        </Text>
        <Text>{currentData.artist}</Text>
      </Flex>
    </MainDiv>
    </>
  );
};

export default MyAudioPlayer;

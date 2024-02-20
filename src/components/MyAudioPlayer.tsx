import React, { useEffect, useRef, useState } from "react";
import { audioPlayer, animationRef } from "../hooks/audioPlayerRefs";

import styled from "@emotion/styled";

import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { BiPlayCircle, BiPauseCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import {
  setCurrentData,
  setCurrentTrackIndex,
  setIsPlaying,
  setPlayNext,
} from "../state/songs/playerSlice";

import styles from "../styles/AudioPlayer.module.css";

const Play = styled(BiPlayCircle)`
  cursor: pointer;
  font-size: 40px;
  &:active {
    transform: scale(0.9);
    transition: transform 0.1s ease;
  }
 
`;

const Pause = styled(BiPauseCircle)`
  cursor: pointer;
  font-size: 40px;
  &:active {
    transform: scale(0.9);
    transition: transform 0.1s ease;
  }

`;

const Prev = styled(BiSkipPrevious)`
  cursor: pointer;
  font-size: 40px;
  transition-duration: 0.4s;
  &:hover {
    color: white;
  }

`;
const Next = styled(BiSkipNext)`
  cursor: pointer;
  font-size: 40px;
  transition-duration: 0.4s;
  &:hover {
    color: white;
  }

`;

const MyAudioPlayer: React.FC = () => {
  
  const dispatch = useDispatch();
  // redux states
  const isPlaying = useSelector(
    (state: RootState) => state.playerData.isPlaying
  );
  const playNext = useSelector((state: RootState) => state.playerData.playNext);

  const currentTrackIndex = useSelector(
    (state: RootState) => state.playerData.currentTrackIndex
  );
  const playerQueue = useSelector(
    (state: RootState) => state.playerData.playerQueue
  );
  const playerQueueLength = useSelector(
    (state: RootState) => state.playerData.playerQueueLength
  );
  const currentData = useSelector(
    (state: RootState) => state.playerData.currentData
  );
  // state
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  // refs
  // const audioPlayer = useRef<HTMLAudioElement>(null!)
  const progressBar = useRef<any>(null!);
  // const animationRef = useRef<number>(null!)
  // console.log(duration)
  useEffect(() => {
    const seconds = Math.floor(audioPlayer?.current?.duration);

    progressBar.current.max = seconds;

    setDuration(seconds);
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer?.current?.readyState,
  ]);
  // convert to min and sec format
  function calculateTime(secs: number) {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }
  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(Number(progressBar.current.value) / Math.floor(audioPlayer?.current?.duration)) * 100}%`
    );
    // console.log(Number(progressBar.current.value), Math.floor(audioPlayer?.current?.duration))
    setCurrentTime(progressBar.current.value);
  };

  // initiate playing animation
  function whilePlaying() {
    //console.log('playing');
    
    progressBar.current.value = audioPlayer.current.currentTime;

    changePlayerCurrentTime()
    animationRef.current = requestAnimationFrame(whilePlaying);

    if (audioPlayer.current && audioPlayer.current.ended) {
      cancelAnimationFrame(animationRef.current);
      dispatch(setPlayNext(true))
      dispatch(setIsPlaying(false))
    }
  }

  useEffect(() => {
    if (audioPlayer.current) {
      if (playNext) {
        dispatch(setIsPlaying(true));
        audioPlayer.current.currentTime = 0;
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      }
      if (!isPlaying) {
        // Stop playing the current song
        //dispatch(setIsPlaying(false));
        //audioPlayer.current.currentTime = 0;
        //audioPlayer.current.pause();
        //cancelAnimationFrame(animationRef.current);
      } else {
        audioPlayer.current.play();
      }
    }
  }, [currentData._id, isPlaying, playNext]);

  // play pause for the player
  const handlePlayPause = () => {
    
    if (isPlaying) {
      audioPlayer.current.pause();
      dispatch(setIsPlaying(false));
      dispatch(setPlayNext(false));
    } else {
      audioPlayer.current.play();
      dispatch(setIsPlaying(true));
      // dispatch(setPlayNext(true));
    }
  };

  // to change the progress bar
  function changeRange() {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  // button Next
  const next = () => {
    if (playerQueueLength > 0) {
      cancelAnimationFrame(animationRef);
      if (currentTrackIndex < playerQueue.length - 1) {
        const nextData = playerQueue[currentTrackIndex + 1];
        dispatch(setCurrentData(nextData));
        if(isPlaying) {
          dispatch(setPlayNext(true));
        }
        dispatch(setCurrentTrackIndex(currentTrackIndex + 1));
      } else {
        dispatch(setCurrentData(playerQueue[0]));
        if(isPlaying) {
          dispatch(setPlayNext(true));
        }
        dispatch(setCurrentTrackIndex(0));
      }
    }
  };

  // button Previous
  const prev = () => {
    if (playerQueueLength > 0) {
      cancelAnimationFrame(animationRef);
      if (currentTrackIndex > 0) {
        const nextData = playerQueue[currentTrackIndex - 1];
        dispatch(setCurrentData(nextData));
        if(isPlaying) {
          dispatch(setPlayNext(true));
        }
        dispatch(setCurrentTrackIndex(currentTrackIndex - 1));
      } else {
        dispatch(setCurrentData(playerQueue[0]));
        if(isPlaying) {
          dispatch(setPlayNext(true));
        }
        dispatch(setCurrentTrackIndex(0));
      }
    }
  };
  return (
    <>
      <audio
        ref={audioPlayer}
        src={currentData.songDataUrl}
        preload="metadata"
        onEnded={() => {
          cancelAnimationFrame(animationRef);
          if (currentTrackIndex < playerQueue.length - 1) {
            const nextData = playerQueue[currentTrackIndex + 1];
            dispatch(setCurrentData(nextData));
            dispatch(setPlayNext(true));
            dispatch(setCurrentTrackIndex(currentTrackIndex + 1));
            console.log("ended");
          } else {
            dispatch(setCurrentData(playerQueue[0]));
            dispatch(setPlayNext(true));
            dispatch(setCurrentTrackIndex(0));
          }
        }}
      />
      <div className="audio-player">
        {/* my audio player */}
        <div className="controls">
          <Prev onClick={prev} />
          <button
            onClick={handlePlayPause}
            style={{
              backgroundColor: "#01345B",
              border: "none",
              color: "white",
              padding: "0px",
            }}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <Next onClick={next} />
        </div>

        
        <div className="progress" style={{ width: "50%" }}>
        <div className="time">{calculateTime(currentTime)}</div>
          {/* progress bar */}
          <input
            ref={progressBar}
            type="range"
            className={styles.progressBar}
            defaultValue="0"
            max={String(duration)}
            onChange={changeRange}
          />
          <div className="time">
          {duration > 0 ? calculateTime(duration) : "0:00"}
        </div>
        </div>
        { currentData.coverImageUrl !== "" ?
        <div className="image-container">
          <img className="StyledImage" src={currentData.coverImageUrl} alt="Album Art" />
        </div> : ""
        }
        <div className="text-container">
          <div className="title">{currentData.title}</div>
          <div className="artist">{currentData.artist}</div>
        </div>
      </div>
    </>
  );
};

export default MyAudioPlayer;

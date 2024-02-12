import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { setIsPlaying, setPlayNext, setCurrentPlayerTime } from "../state/songs/playerSlice";
import { useEffect, useRef, useState } from "react";
import { audioRef, animationRef, progressBarRef } from "./audioPlayerRefs";


//import { audioRef } from "../components/MyAudioPlayer";

export function useAudioplayer() {
  // const audioRef = useRef<HTMLAudioElement | null>(null);
  // const animationRef = useRef<any>(null)
  //const progressBarRef = useRef<any>(null);

  const [currentTime, setCurrentTime] = useState(0);
  
  const isPlaying = useSelector(
    (state: RootState) => state.playerData.isPlaying
  );
  const playNext = useSelector((state: RootState) => state.playerData.playNext);
  const currentData: any = useSelector(
    (state: RootState) => state.playerData.currentData
  );
  const dispatch = useDispatch();
  //const setIsPlaying = useSelector((state: RootState) => state.playerData.isPlaying)

  const handlePlayPause = () => {
    if (isPlaying) {
      console.log("was playing");
      audioRef?.current?.pause();
      dispatch(setIsPlaying(false));
      dispatch(setPlayNext(false));
      // cancel the animation which is called while playing
      cancelAnimationFrame(animationRef.current);
    } else {
      //audioRef?.current?.play();
      dispatch(setIsPlaying(true));
      dispatch(setPlayNext(true));
    }
  };
  
  function whilePlaying() {
    progressBarRef.current.value = audioRef.current.currentTime;
    setCurrentTime(progressBarRef.current.value)
    if (audioRef?.current?.readyState) {
      // progressBarRef.current.value = audioRef.current.currentTime;
      setCurrentTime(progressBarRef.current.value);
      
    }

    // recurssively call it in order to set the current time and progress bar
    animationRef.current = requestAnimationFrame(whilePlaying);

    if (audioRef.current.paused || audioRef.current.ended) {
      cancelAnimationFrame(animationRef.current);
    }
  }
  

  useEffect(() => {
    if (audioRef.current) {
      if (playNext) {
        dispatch(setIsPlaying(true));
        audioRef?.current?.play();
        console.log("next-------------");
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        // audioRef.current.pause()
        console.log("cancel;");
        //cancelAnimationFrame(animationRef.current);
      }
    }
  }, [currentData._id, isPlaying]);
  console.log(currentTime);
  
  return {
    stateValue: {
      isPlaying: isPlaying,
      playNext: playNext,
      currentTime: currentTime,
    },
    methods: {
      handlePlayPause,
      setCurrentTime,
    },
    refs: {
      audioRef,
      progressBarRef,
    },
  };
}

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { setIsPlaying, setPlayNext } from "../state/songs/playerSlice";
import { useEffect, useRef, useState } from "react";

//import { audioRef } from "../components/MyAudioPlayer";

export function useAudioplayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const isPlaying = useSelector(
    (state: RootState) => state.playerData.isPlaying
  );
  const playNext = useSelector(
    (state: RootState) => state.playerData.playNext
  );
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
      //cancelAnimationFrame(animationRef.current);
    } else {
      dispatch(setPlayNext(true));
      audioRef?.current?.play();
      dispatch(setIsPlaying(true));
      
    }
  };
  useEffect(() => {
    if(audioRef.current) {
    if (playNext) {
        dispatch(setIsPlaying(true));
        audioRef?.current?.play()
        console.log("next-------------");
        
      } else {
        // audioRef.current.pause()
        console.log("cancel;");
        //cancelAnimationFrame(animationRef.current);
        
      }
    }
  }, [currentData._id, isPlaying])

  return {
    stateValue: {
        isPlaying: isPlaying,
        playNext: playNext,
        duration: duration,
        currentTime: currentTime
    },
    methods: {
        handlePlayPause
    },
    refs: {
      audioRef
    }
  }
}

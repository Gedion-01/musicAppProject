import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { setIsPlaying, setPlayNext } from "../state/songs/playerSlice";
import { useEffect } from "react";

export function useAudioplayer() {
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

      dispatch(setIsPlaying(false));
      dispatch(setPlayNext(false));
      // cancel the animation which is called while playing
      //cancelAnimationFrame(animationRef.current);
    } else {
      dispatch(setIsPlaying(true));
      dispatch(setPlayNext(true));
    }
  };
  useEffect(() => {
    if (playNext) {
        dispatch(setIsPlaying(true));
        
        console.log("next-------------");
        
      } else {
        // audioRef.current.pause()
        console.log("cancel;");
        //cancelAnimationFrame(animationRef.current);
        
      }
  }, [currentData.title, isPlaying])

  return {
    stateValue: {
        isPlaying: isPlaying,
        playNext: playNext
    },
    methods: {
        handlePlayPause
    }
  }
}

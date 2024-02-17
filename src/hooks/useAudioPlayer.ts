// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../state/store";
// import { useEffect, useRef, useState } from "react";
// import { audioPlayer, animationRef, progressBar } from "./audioPlayerRefs";
// import { usePlayer } from "./usePlayer";
// import { setIsPlaying } from "../state/songs/playerSlice";


// //import { audioRef } from "../components/MyAudioPlayer";

// export function useAudioPlayer() {
//     const dispatch = useDispatch()
//     const [currentTime, setCurrentTime] = useState(0)
//     const isPlaying = useSelector(
//         (state: RootState) => state.playerData.isPlaying
//       );
//       const playNext = useSelector((state: RootState) => state.playerData.playNext);
//       const currentData: any = useSelector(
//         (state: RootState) => state.playerData.currentData
//       );
//     function whilePlaying() {
//         const currentTime = audioPlayer.current.currentTime;
//       //const duration = audioPlayer.current.duration;
//       progressBar.current.value = currentTime;
//       setCurrentTime(currentTime);
      
//         animationRef.current = requestAnimationFrame(whilePlaying);
      
//         if (audioPlayer.current && audioPlayer.current.ended && audioPlayer.current.paused) {
//           cancelAnimationFrame(animationRef.current);
//         }
//       }
      
    
//     useEffect(() => {
//         if (audioPlayer.current) {
//           if (playNext) {
//             dispatch(setIsPlaying(true));
//             // Pause the current song if it's playing
//             // if (isPlaying) {
//             //   audioPlayer.current.pause();
//             // }
//             // Set the new song and play it
//             audioPlayer.current.currentTime = 0;
//             audioPlayer.current.play();
//             animationRef.current = requestAnimationFrame(whilePlaying);
//           } 
//           if(!isPlaying){
//             // Stop playing the current song
//             //dispatch(setIsPlaying(false));
//             //audioPlayer.current.currentTime = 0;
//             audioPlayer.current.pause();
//             //cancelAnimationFrame(animationRef.current);
//           } else {
//             audioPlayer.current.play()
//           }
//         }
//       }, [currentData._id, isPlaying]);
  
//   return {
//     stateValue: {
//     //   isPlaying: isPlaying,
//     //   playNext: playNext,
//       currentTime: currentTime,
//     },
//     methods: {
//     //   handlePlayPause,
//     //   setCurrentTime,
//     },
//     refs: {
//       audioPlayer,
//       progressBar,
//       animationRef
//     },
//   };
// }

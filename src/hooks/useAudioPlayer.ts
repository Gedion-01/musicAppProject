// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../state/store";
// import { useEffect, useRef, useState } from "react";
// // import { audioPlayer, animationRef, progressBar } from "./audioPlayerRefs";
// import { usePlayer } from "./usePlayer";


// //import { audioRef } from "../components/MyAudioPlayer";

// export function useAudioPlayer() {
//   const {isPlaying, playNext, currentData, audioRef, progressBarRef, animationRef, setIsPlaying, setPlayNext} = usePlayer()
//   // const audioRef = useRef<HTMLAudioElement | null>(null);
//   // const animationRef = useRef<any>(null)
//   //const progressBarRef = useRef<any>(null);

//   const [currentTime, setCurrentTime] = useState(0);

//   // const isPlaying = useSelector(
//   //   (state: RootState) => state.playerData.isPlaying
//   // );
//   // const playNext = useSelector((state: RootState) => state.playerData.playNext);
//   // const currentData: any = useSelector(
//   //   (state: RootState) => state.playerData.currentData
//   // );
//   // const dispatch = useDispatch();
//   //const setIsPlaying = useSelector((state: RootState) => state.playerData.isPlaying)

//   const handlePlayPause = () => {
//     if (isPlaying) {
//       console.log("was playing");
//       audioRef?.current?.pause();
//       setIsPlaying(false);
//       setPlayNext(false);
//       // cancel the animation which is called while playing
//       cancelAnimationFrame(animationRef.current);
//     } else {
//       //audioRef?.current?.play();
//       setIsPlaying(true);
//       setPlayNext(true);
//     }
//   };

  
//   function whilePlaying() {
//     progressBarRef.current.value = String(audioRef?.current?.currentTime);
//     if (audioRef.current) {
//       setCurrentTime(Number(progressBarRef.current.value));
//     }

//     animationRef.current = requestAnimationFrame(whilePlaying);
  
//     if (audioRef?.current?.paused || audioRef?.current?.ended) {
//       cancelAnimationFrame(animationRef.current);
//     }
//   }
  

//   useEffect(() => {
//     if (audioRef.current) {
//       if (playNext) {
//         setIsPlaying(true);
//         audioRef?.current?.play();
//         console.log("next-------------");
//         animationRef.current = requestAnimationFrame(whilePlaying);
//       } else {
//         audioRef.current.pause()
//         console.log("cancel;");
//         //cancelAnimationFrame(animationRef.current);
//       }
//     }
//   }, [currentData._id, isPlaying]);
//   console.log(currentTime);
  
//   return {
//     stateValue: {
//       isPlaying: isPlaying,
//       playNext: playNext,
//       currentTime: currentTime,
//     },
//     methods: {
//       handlePlayPause,
//       setCurrentTime,
//     },
//     refs: {
//       audioRef,
//       progressBarRef,
//     },
//   };
// }

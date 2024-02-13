import React, { MutableRefObject, useRef } from "react";
import {create} from "zustand";

interface Player {
  audioRef: MutableRefObject<any>;
  progressBarRef: MutableRefObject<any>;
  animationRef: MutableRefObject<any>;
  isPlaying: boolean;
  playNext: boolean;
  currentData: any;
  currentTrackIndex: number;
  playerQueue: any[]; // Adjust the type as per your actual data structure
  playerQueueLength: number;
  currentPlayerTime: any;

  // Define actions
  setIsPlaying: (isPlaying: boolean) => void;
  setPlayNext: (playNext: boolean) => void;
  setCurrentData: (currentData: {}) => void;
  setCurrentTrackIndex: (currentTrackIndex: number) => void;
  setPlayerQueue: (playerQueue: []) => void;
  setPlayerQueueLength: (playerQueueLength: number) => void;
  setCurrentPlayerTime: (currentPlayerTime: any) => void;
}

export const usePlayer = create<Player>((set) => ({
  audioRef: React.createRef(),
  progressBarRef: React.createRef(),
  animationRef: React.createRef(),
  isPlaying: false,
  playNext: false,
  currentData: {},
  currentTrackIndex: 0,
  playerQueue: [],
  playerQueueLength: 0,
  currentPlayerTime: 0,
  // Define actions to update the state
  setIsPlaying: (status: boolean) => set((state) => ({ isPlaying: status })),
  setPlayNext: (status: boolean) => set((state) => ({ playNext: status })),
  setCurrentData: (currentData: {}) =>
    set((state) => ({ currentData: currentData })),
  setCurrentTrackIndex: (index: number) =>
    set((state) => ({ currentTrackIndex: index })),
  setPlayerQueue: (songs: []) => set((state) => ({ playerQueue: songs })),
  setPlayerQueueLength: (length: number) =>
    set((state) => ({ playerQueueLength: length })),
  setCurrentPlayerTime: (time: any) =>
    set((state) => ({ currentPlayerTime: time })),
}));

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRef } from 'react';

export const animationRef: any = createRef();
export const audioRef: any = createRef();
export const progressBarRef: any = createRef()
interface Player {
    isPlaying: boolean;
    playNext: boolean;
    currentData: {};
    currentTrackIndex: number;
    playerQueue: [];
    playerQueueLength: number;
    currentPlayerTime: any;
}

const initialState: Player = {
    isPlaying: false,
    playNext: false,
    currentData: {},
    currentTrackIndex: 0,
    playerQueue: [],
    playerQueueLength: 0,
    currentPlayerTime: 0
}

const playerSlice = createSlice({
    name: "playerDate",
    initialState,
    reducers: {
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload
        },
        setPlayNext: (state, action: PayloadAction<boolean>) => {
            state.playNext = action.payload
        },
        setCurrentData: (state, action: PayloadAction<{}>) => {
            state.currentData = action.payload
        },
        setCurrentTrackIndex: (state, action: PayloadAction<number>) => {
            state.currentTrackIndex = action.payload
        },
        setPlayerQueue: (state, action: PayloadAction<[]>) => {
            state.playerQueue = action.payload
        },
        setPlayerQueueLength: (state, action: PayloadAction<number>) => {
            state.playerQueueLength = action.payload
        },
        setCurrentPlayerTime: (state, action: PayloadAction<any>) => {
            state.currentPlayerTime = action.payload
            console.log(state.currentPlayerTime)
        }
    }
})

export const {setIsPlaying, setPlayNext, setCurrentData, setCurrentTrackIndex, setPlayerQueue, setPlayerQueueLength, setCurrentPlayerTime} = playerSlice.actions

export default playerSlice.reducer
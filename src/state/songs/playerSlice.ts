import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Player {
    isPlaying: boolean;
    playNext: boolean;
    currentData: {};
    currentTrackIndex: number;
    playerQueue: [];
    playerQueueLength: number;
}

const initialState: Player = {
    isPlaying: false,
    playNext: false,
    currentData: {},
    currentTrackIndex: 0,
    playerQueue: [],
    playerQueueLength: 0
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
        }
    }
})

export const {setIsPlaying, setPlayNext, setCurrentData, setCurrentTrackIndex, setPlayerQueue, setPlayerQueueLength} = playerSlice.actions

export default playerSlice.reducer
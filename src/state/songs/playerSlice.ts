import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
    coverImageUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    songDataUrl: string
  }
interface Player {
    isPlaying: boolean;
    playNext: boolean;
    currentData: Song;
    currentTrackIndex: number;
    playerQueue: Song[];
    playerQueueLength: number;
}

const initialState: Player = {
    isPlaying: false,
    playNext: false,
    currentData: {
        _id: "",
        title: "",
        artist: "",
        album: "",
        genre: "",
        coverImageUrl: "",
        createdAt: "",
        updatedAt: "",
        __v: 0,
        songDataUrl: ""
    },
    currentTrackIndex: 0,
    playerQueue: [],
    playerQueueLength: 0,
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
        setCurrentData: (state, action: PayloadAction<Song>) => {
            state.currentData = action.payload
        },
        setCurrentTrackIndex: (state, action: PayloadAction<number>) => {
            state.currentTrackIndex = action.payload
        },
        setPlayerQueue: (state, action: PayloadAction<Song[]>) => {
            state.playerQueue = action.payload
        },
        setPlayerQueueLength: (state, action: PayloadAction<number>) => {
            state.playerQueueLength = action.payload
        },
    }
})

export const {setIsPlaying, setPlayNext, setCurrentData, setCurrentTrackIndex, setPlayerQueue, setPlayerQueueLength} = playerSlice.actions

export default playerSlice.reducer
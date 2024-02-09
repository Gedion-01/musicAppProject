import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Songs {
    songs: [];
    songsByGenre: [];
    isLoading: boolean;
    isError: boolean;
}

const initialState : Songs = {
    songs: [],
    songsByGenre: [],
    isLoading: true,
    isError: false
}

const songsSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        getSongs: (state, action : PayloadAction<[]>) => {
            state.isLoading = false
            state.songs = action.payload
        },
        songsByGenre: (state, action : PayloadAction<[]>) => {
            state.isLoading = false
            state.songsByGenre = action.payload
        }
    }
})

export const {getSongs, songsByGenre} = songsSlice.actions

export default songsSlice.reducer

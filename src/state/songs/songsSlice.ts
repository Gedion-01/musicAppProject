import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Songs {
    songs: [];
    songsByGenre: [];
    getSongsLoading: boolean;
    songsByGenreLoading: boolean;
    isError: boolean;
}

const initialState : Songs = {
    songs: [],
    songsByGenre: [],
    getSongsLoading: true,
    songsByGenreLoading: true,
    isError: false
}

const songsSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        getSongs: (state, action : PayloadAction<[]>) => {
            state.getSongsLoading = false
            state.songs = action.payload
        },
        songsByGenre: (state, action : PayloadAction<[]>) => {
            state.songsByGenreLoading = false
            state.songsByGenre = action.payload
        }
    }
})

export const {getSongs, songsByGenre} = songsSlice.actions

export default songsSlice.reducer

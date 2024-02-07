import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Songs {
    songs: [];
    isLoading: boolean;
    isError: boolean;
}

const initialState : Songs = {
    songs: [],
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
        }
    }
})

export const {getSongs} = songsSlice.actions

export default songsSlice.reducer

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
}

interface Songs {
  songs: Song[];
  songsByGenre: Song[];
  searchedSong: Song;
  getSongsLoading: boolean;
  songsByGenreLoading: boolean;
  searchedSongLoading: boolean;
  isError: boolean;
  isCreateSongCausingError: boolean;
  addSongButtonLoading: boolean;
  isEditSongCausingError: boolean;
  EditSongButtonLoading: boolean;
  isSongtoBeDeletedMarked: boolean;
  isDeleteSongCausingError: boolean;
}

const initialState: Songs = {
  songs: [],
  songsByGenre: [],
  searchedSong: {
    _id: "",
    title: "",
    artist: "",
    album: "",
    genre: "",
    coverImageUrl: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
  getSongsLoading: true,
  songsByGenreLoading: true,
  searchedSongLoading: true,
  isError: false,
  // for creation purpose
  isCreateSongCausingError: false,
  addSongButtonLoading: false,
  // for editing purpose
  isEditSongCausingError: false,
  EditSongButtonLoading: false,
  // for deleting purpose
  isSongtoBeDeletedMarked: false,
  isDeleteSongCausingError: false
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.getSongsLoading = false;
      state.songs = action.payload;
    },
    setSongsByGenre: (state, action: PayloadAction<Song[]>) => {
      state.songsByGenreLoading = false;
      state.songsByGenre = action.payload;
    },
    setSearchSong: (state, action: PayloadAction<Song>) => {
      state.searchedSongLoading = false;
      state.searchedSong = action.payload;
    },
    setCreateSongCauseAnError: (state, action: PayloadAction<boolean>) => {
      state.isCreateSongCausingError = action.payload;
    },
    setAddSongButtonLoading: (state, action: PayloadAction<boolean>) => {
      state.addSongButtonLoading = action.payload;
    },
    //
    setEditSongCauseAnError: (state, action: PayloadAction<boolean>) => {
      state.isEditSongCausingError = action.payload;
    },
    setEditSongButtonLoading: (state, action: PayloadAction<boolean>) => {
      state.EditSongButtonLoading = action.payload;
    },
    //
    setSongtoBeDeletedMarked: (state, action: PayloadAction<boolean>) => {
        state.isSongtoBeDeletedMarked = action.payload
    },
    setDeleteSongCausingError: (state, action: PayloadAction<boolean>) => {
        state.isDeleteSongCausingError = action.payload
    }
  },
});

export const {
  setSongs,
  setSongsByGenre,
  setSearchSong,
  setCreateSongCauseAnError,
  setAddSongButtonLoading,
  setEditSongCauseAnError,
  setEditSongButtonLoading,
  setSongtoBeDeletedMarked,
  setDeleteSongCausingError
} = songsSlice.actions;

export default songsSlice.reducer;

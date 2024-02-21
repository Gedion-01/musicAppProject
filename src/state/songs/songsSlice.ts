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
  songDataUrl: string
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
  songCreatedSuccessfully: boolean;
  isEditSongCausingError: boolean;
  EditSongButtonLoading: boolean;
  isDeleteSongCausingError: boolean;
  showSuccessToast: boolean;
  showFailedToast: boolean;
  showOpenDeleteModal: boolean;
  isRemoveSuccessFull: boolean;
  imageProgress: number;
  audioProgress: number;
  imageFile: File | undefined;
  audioFile: File | undefined;
  search: string;
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
    songDataUrl: ""
  },
  getSongsLoading: true,
  songsByGenreLoading: true,
  searchedSongLoading: true,
  isError: false,
  // for creation purpose
  isCreateSongCausingError: false,
  addSongButtonLoading: false,
  songCreatedSuccessfully: true,
  // for editing purpose
  isEditSongCausingError: false,
  EditSongButtonLoading: false,
  // for deleting purpose
  isDeleteSongCausingError: false,
  isRemoveSuccessFull: false,
  // for toast
  showSuccessToast: false,
  showFailedToast: false,
  // for modal
  showOpenDeleteModal: false,
  // for uploading
  imageProgress: 0,
  audioProgress: 0,
  imageFile: undefined,
  audioFile: undefined,
  search: ""
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
    setSongsByGenreLoading:(state, action: PayloadAction<boolean>) => {
      state.songsByGenreLoading = action.payload
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
    setShowSuccessToast: (state, action: PayloadAction<boolean>) => {
      state.showSuccessToast = action.payload
    },
    setShowFailedToast: (state, action: PayloadAction<boolean>) => {
      state.showFailedToast = action.payload
    },
    setRemoveSuccessFull: (state, action: PayloadAction<boolean>) => {
      state.isRemoveSuccessFull = action.payload
    },
    setOpenDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.showOpenDeleteModal = action.payload
    },
    setImageProgress: (state, action: PayloadAction<number>) => {
      state.imageProgress = action.payload
    },
    setAudioProgress: (state, action: PayloadAction<number>) => {
      state.audioProgress = action.payload
    },
    setImageFile: (state, action: PayloadAction<File | undefined>) => {
      state.imageFile = action.payload
    },
    setAudioFile: (state, action: PayloadAction<File | undefined>) => {
      state.audioFile = action.payload
    },
    setSongCreatedSuccessfully: (state, action: PayloadAction<boolean>) => {
      state.songCreatedSuccessfully = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
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
  setShowSuccessToast,
  setShowFailedToast,
  setOpenDeleteModal,
  setImageProgress,
  setAudioProgress,
  setImageFile,
  setAudioFile,
  setSongCreatedSuccessfully,
  setRemoveSuccessFull,
  setSearch,
  setSongsByGenreLoading
} = songsSlice.actions;

export default songsSlice.reducer;

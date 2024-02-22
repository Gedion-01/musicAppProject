import { call, put, select, takeEvery } from "redux-saga/effects";

import {
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
  setRemoveSuccessFull,
  setSongsByGenreLoading,
} from "./songs/songsSlice";

import axios, { AxiosResponse } from "axios";
import { RootState } from "./store";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function* fetchSongs() {
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(`${VITE_BASE_URL}/listSongs`)
    );
    yield put(setSongs(response.data.songs));
  } catch (error) {}
}

type genreAction = {
  type: string;
  payload: {
    genre: string;
  };
};
function* fetchSongsByGenre(action: genreAction) {
  yield put(setSongsByGenreLoading(true));
  const { genre } = action.payload;
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(`${VITE_BASE_URL}/genre/${genre}`)
    );

    yield put(setSongsByGenre(response.data.songs));
  } catch (error) {
    console.log(error);
    yield put(setSongsByGenreLoading(false));
  }
}

type formdData = {
  title: string;
  artist: string;
  album: string;
  genre: string;
  songid?: string;
};

type formAction = {
  type: string;
  payload: {
    data: formdData;
  };
};

function* createSong(action: formAction) {
  yield put(setAddSongButtonLoading(true));

  // Check if action.payload exists before destructuring
  if (action.payload) {
    const { data } = action.payload;
    let imageProgress: number = 0;
    let audioProgress: number = 0;
    console.log(data);

    try {
      const image: File = yield select(
        (state: RootState) => state.songs.imageFile
      );
      const audio: File = yield select(
        (state: RootState) => state.songs.audioFile
      );

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("artist", data.artist);
      formData.append("album", data.album);
      formData.append("genre", data.genre);
      formData.append("audio", audio);
      formData.append("image", image);

      console.log(formData);
      const response: AxiosResponse = yield call(() => {
        return axios.post(`${VITE_BASE_URL}/uploadSong`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            imageProgress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.loaded
            );
            audioProgress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.loaded
            );
          },
        });
      });
      yield put(setImageProgress(imageProgress));
      yield put(setAudioProgress(audioProgress));
      console.log(response);
      yield put(setCreateSongCauseAnError(false));

      yield put(setAddSongButtonLoading(false));
      yield put(setShowSuccessToast(true));
    } catch (error) {
      yield put(setCreateSongCauseAnError(true));
      yield put(setAddSongButtonLoading(false));
      console.log(error);
    }
  } else {
    console.log("Payload is undefined");
  }
}

type formActionUpdate = {
  type: string;
  payload: {
    data: formdData & {
      coverImageUrl: string;
      songDataUrl: string;
      songid: string;
    };
  };
};

function* updateSong(action: formActionUpdate) {
  yield put(setEditSongButtonLoading(true));

  // Check if action.payload exists before destructuring
  if (action.payload) {
    const { data } = action.payload;

    let imageProgress: number = 0;
    let audioProgress: number = 0;

    try {
      // we get files from redux store
      const image: File = yield select(
        (state: RootState) => state.songs.imageFile
      );
      const audio: File = yield select(
        (state: RootState) => state.songs.audioFile
      );

      const formData = new FormData();

      formData.append("songid", data.songid);
      formData.append("title", data.title);
      formData.append("artist", data.artist);
      formData.append("album", data.album);
      formData.append("genre", data.genre);
      formData.append("coverImageUrl", data.coverImageUrl);
      formData.append("songDataUrl", data.songDataUrl);
      formData.append("audio", audio);
      formData.append("image", image);

      yield call(() => {
        return axios.put(`${VITE_BASE_URL}/updateSong`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              imageProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              audioProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            }
          },
        });
      });
      yield put(setImageProgress(imageProgress));
      yield put(setAudioProgress(audioProgress));

      yield put(setEditSongCauseAnError(false));

      yield put(setEditSongButtonLoading(false));
      yield put(setShowSuccessToast(true));
    } catch (error) {
      yield put(setEditSongCauseAnError(true));
      yield put(setEditSongButtonLoading(false));
      console.log(error);
    }
  } else {
    console.log("Payload is undefined");
  }
}

type songByIdAction = {
  type: string;
  payload: {
    id: string;
  };
};

function* getSongById(action: songByIdAction) {
  const { id }: { id: string } = action.payload;
  try {
    const response: AxiosResponse = yield call(() => {
      return axios.get(`${VITE_BASE_URL}/searchSong/${id}`);
    });
    yield put(setSearchSong(response.data.song));
  } catch (error) {
    console.log(error);
  }
}

type deleteSongAction = {
  type: string;
  payload: {
    songid: string;
  };
};

function* deleteSongById(action: deleteSongAction) {
  try {
    const { songid }: { songid: string } = action.payload;

    const queryParmams = {
      songid: songid,
    };

    // Send a request to delete the song
    const response: AxiosResponse = yield call(() => {
      return axios.delete(`${VITE_BASE_URL}/removeSong`, {
        params: queryParmams,
      });
    });
    console.log(response.data.message);
    const songToRemove = response.data.removedSong;

    // Update the songs list and songs by genre after deletion
    const songs: RootState["songs"]["songs"] = yield select(
      (state: RootState) => state.songs.songs
    );
    const songsByGenre: RootState["songs"]["songsByGenre"] = yield select(
      (state: RootState) => state.songs.songsByGenre
    );

    const filteredSongs = songs.filter((song) => song._id !== songToRemove._id);
    const filteredSongsByGenre = songsByGenre.filter(
      (song) => song._id !== songToRemove._id
    );

    yield put(setSongs(filteredSongs));
    yield put(setSongsByGenre(filteredSongsByGenre));

    // Set delete success Toast on
    yield put(setRemoveSuccessFull(true));
  } catch (error) {
    yield put(setOpenDeleteModal(false));
    yield put(setShowFailedToast(true));
    console.log(error);
  }
}

export function* fetchSongsSaga() {
  yield takeEvery("songs/fetchSongs", fetchSongs);
}

export function* fetchSongsByGenreSaga() {
  yield takeEvery("songsByGenre/fetchSongs", fetchSongsByGenre);
}

export function* createSongSaga() {
  yield takeEvery("song/createSong", createSong);
}
export function* updateSongSaga() {
  yield takeEvery("song/updateSong", updateSong);
}

export function* getSongByIdSaga() {
  yield takeEvery("song/getSongById", getSongById);
}
export function* deleteSongByIdSaga() {
  yield takeEvery("song/deleteSongById", deleteSongById);
}

import { call, put, takeEvery } from "redux-saga/effects";
import { useSelector } from "react-redux";
import {
  setSongs,
  setSongsByGenre,
  setSearchSong,
  setCreateSongCauseAnError,
  setAddSongButtonLoading,
  setEditSongCauseAnError,
  setEditSongButtonLoading,
  setSongtoBeDeletedMarked,
  setDeleteSongCausingError,
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
  } catch (error) {
    console.log(error);
  }
}
function* fetchSongsByGenre(action: any) {
  const { genre }: { genre: string } = action.payload;
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(`${VITE_BASE_URL}/genre/${genre}`)
    );

    yield put(setSongsByGenre(response.data.songs));
  } catch (error) {
    console.log(error);
  }
}

type formdData = {
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverImageUrl: string;
};

function* createSong(action: any) {
  yield put(setAddSongButtonLoading(true));

  // Check if action.payload exists before destructuring
  if (action.payload) {
    const { data }: { data: formdData } = action.payload;
    console.log(data);
    try {
      const response: AxiosResponse = yield call(() => {
        return axios.post(`${VITE_BASE_URL}/createSong`, data);
      });
      yield put(setCreateSongCauseAnError(false));
      console.log(response.data);
      yield put(setAddSongButtonLoading(false));
    } catch (error) {
      yield put(setCreateSongCauseAnError(true));
      yield put(setAddSongButtonLoading(false));
      console.log(error);
    }
  } else {
    console.log("Payload is undefined");
  }
}
function* updateSong(action: any) {
  yield put(setEditSongButtonLoading(true));

  // Check if action.payload exists before destructuring
  if (action.payload) {
    const { data }: { data: formdData } = action.payload;
    console.log(data);
    try {
      const response: AxiosResponse = yield call(() => {
        return axios.put(`${VITE_BASE_URL}/updateSong`, data);
      });
      yield put(setEditSongCauseAnError(false));
      console.log(response.data);
      yield put(setEditSongButtonLoading(false));
    } catch (error) {
      yield put(setEditSongCauseAnError(true));
      yield put(setEditSongButtonLoading(false));
      console.log(error);
    }
  } else {
    console.log("Payload is undefined");
  }
}
function* getSongById(action: any) {
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
function* deleteSongById(action: any) {
  // lets mark the song which is in pending state
  yield put(setSongtoBeDeletedMarked(true))
  const songs = useSelector((state: RootState) => state.songs.songs);

  const songsByGenre = useSelector(
    (state: RootState) => state.songs.songsByGenre
  );

  const { queryParams }: { queryParams: { songid: string } } = action.payload;
  try {
    const response: AxiosResponse = yield call(() => {
      return axios.delete(`${VITE_BASE_URL}/removeSong`, {
        params: queryParams,
      });
    });
    const songToRemove = response.data.removedSong;
    const filterdSongs = songs.filter((song) => song._id !== songToRemove._id);
    const filterdSongsByGenre = songsByGenre.filter(
      (song) => song._id !== songToRemove._id
    );
    yield put(setSongs(filterdSongs));
    yield put(setSongsByGenre(filterdSongsByGenre));
    
    // if previously there was an error status set to true unset it
    yield put(setDeleteSongCausingError(false))
    // if pending state goes to completed unmark it
    yield put(setSongtoBeDeletedMarked(false))
    // need get message and set it to the state
    // then open notification
    // then remove the deleted data from the songs list
  } catch (error) {
    // if pending state goes to fail unmark it
    yield put(setSongtoBeDeletedMarked(false))
    // if an eror occur raise a flag
    yield put(setDeleteSongCausingError(true))
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
  yield takeEvery("song/deleteSongById", getSongById)
}
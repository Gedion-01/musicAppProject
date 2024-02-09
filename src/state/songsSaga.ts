import { call, put, takeEvery } from "redux-saga/effects";
import { getSongs, songsByGenre } from "./songs/songsSlice";

import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function* fetchSongs() {
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(`${VITE_BASE_URL}/listSongs`)
    );
    yield put(getSongs(response.data.songs));
  } catch (error) {
    console.log(error);
  }
}
function* fetchSongsByGenre(action: any) {
  const { genre } : {genre: string} = action.payload;
  try {
    const response : AxiosResponse = yield call(() =>
      axios.get(`${VITE_BASE_URL}/genre/${genre}`)
    )

    yield put(songsByGenre(response.data.songs))
  } catch (error) {
    console.log(error);
  }
}

export function* fetchSongsSaga() {
  yield takeEvery("songs/fetchSongs", fetchSongs);
}

export function* fetchSongsByGenreSaga() {
  yield takeEvery("songsByGenre/fetchSongs", fetchSongsByGenre)
}

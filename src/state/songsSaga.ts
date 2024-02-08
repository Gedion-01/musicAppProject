import { call, put, takeEvery } from "redux-saga/effects";
import { getSongs } from "./songs/songsSlice";

import axios, { AxiosResponse } from "axios";

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

export function* fetchSongsSaga() {
  yield takeEvery("songs/fetchSongs", fetchSongs);
}

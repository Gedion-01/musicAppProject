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

type Song = {
    title: string,
    artist: string,
    album: string,
    genre: string,
    coverImageUrl: string
}

function* createSong(action: any) {
  console.log(`${VITE_BASE_URL}/createSong`);

  // Check if action.payload exists before destructuring
  if (action.payload) {
    const { data }: { data: Song } = action.payload;
    console.log(data)
    try {
      const response: AxiosResponse = yield call(() => {
        return axios.post(`${VITE_BASE_URL}/createSong`, data);
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Payload is undefined');
  }
}

export function* fetchSongsSaga() {
  yield takeEvery("songs/fetchSongs", fetchSongs);
}

export function* fetchSongsByGenreSaga() {
  yield takeEvery("songsByGenre/fetchSongs", fetchSongsByGenre)
}

// after adding a song we need to refresh the list by fetching songs again
export function* createSongSaga() {
  yield takeEvery("song/createSong", createSong)
}
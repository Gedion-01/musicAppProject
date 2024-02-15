import { call, put, select, takeEvery } from "redux-saga/effects";
import { useDispatch } from 'react-redux';

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
  setAudioProgress
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
};
type imageFile = {imageFile: File}
type audioFile = {audioFile: File}


function* createSong(action: any) {
  yield put(setAddSongButtonLoading(true));

  // Check if action.payload exists before destructuring
  if (action.payload) {
    const { data }: { data: formdData } = action.payload;
    let imageProgress: number = 0
    let audioProgress: number = 0
    
    try {
      const image: File = yield select((state: RootState) => state.songs.imageFile)
      const audio: File = yield select((state: RootState) => state.songs.audioFile)
      console.log(image, audio)
      
      const formData = new FormData();
      
      formData.append('title', data.title);
      formData.append('artist', data.artist);
      formData.append('album', data.album);
      formData.append('genre', data.genre);
      formData.append('audio', audio)
      formData.append('image', image)
      console.log(formData)
      // Log FormData values
      console.log("FormData:");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const response: AxiosResponse = yield call(() => {
        return axios.post(`${VITE_BASE_URL}/uploadSong`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            imageProgress = Math.round((progressEvent.loaded * 100) / progressEvent.loaded)
            audioProgress = Math.round((progressEvent.loaded * 100) / progressEvent.loaded)

          }
        });
      });
      yield put(setImageProgress(imageProgress))
      yield put(setAudioProgress(audioProgress))
      console.log(response)
      yield put(setCreateSongCauseAnError(false));
      
      yield put(setAddSongButtonLoading(false));
      yield put(setShowSuccessToast(true))
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

  try {
    const { songid }: { songid: string } = action.payload;
    console.log(songid, action);
    const queryParmams = {
      songid: songid
    }
    
    // Send a request to delete the song
    const response: AxiosResponse = yield call(() => {
      return axios.delete(`${VITE_BASE_URL}/removeSong`, {
        params: queryParmams,
      });
    });
    console.log(response.data.message)
    const songToRemove = response.data.removedSong;

    // Update the songs list and songs by genre after deletion
    const songs: RootState['songs']['songs'] = yield select((state: RootState) => state.songs.songs);
    const songsByGenre: RootState['songs']['songsByGenre'] = yield select((state: RootState) => state.songs.songsByGenre);
    
    const filteredSongs = songs.filter(song => song._id !== songToRemove._id);
    const filteredSongsByGenre = songsByGenre.filter(song => song._id !== songToRemove._id);

    yield put(setSongs(filteredSongs));
    yield put(setSongsByGenre(filteredSongsByGenre));
    

    // Set delete success Toast on
    yield put(setShowSuccessToast(true))

  } catch (error) {
    yield put(setOpenDeleteModal(false))
    yield put(setShowFailedToast(true))
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
  yield takeEvery("song/deleteSongById", deleteSongById)
}

function setSetSongCreatedSuccessfully(arg0: boolean): any {
  throw new Error("Function not implemented.");
}

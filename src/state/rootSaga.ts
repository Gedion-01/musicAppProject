import { all } from "redux-saga/effects";
import {
  fetchSongsSaga,
  fetchSongsByGenreSaga,
  createSongSaga,
} from "./songsSaga";
import {
  fetchSongsStatisticsSaga,
  fetchSongsStatisticsDataSaga,
} from "./songsStatisticsSaga";

export default function* rootSaga() {
  yield all([
    fetchSongsSaga(),
    fetchSongsByGenreSaga(),
    createSongSaga(),
    fetchSongsStatisticsSaga(),
    fetchSongsStatisticsDataSaga(),
  ]);
}

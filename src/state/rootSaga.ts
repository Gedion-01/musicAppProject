import {all} from "redux-saga/effects"
import {fetchSongsSaga, fetchSongsByGenreSaga} from "./songsSaga"
import { fetchSongsStatisticsSaga, fetchSongsStatisticsDataSaga } from "./songsStatisticsSaga"

export default function* rootSaga() {
    yield all([fetchSongsSaga(), fetchSongsByGenreSaga(), fetchSongsStatisticsSaga(), fetchSongsStatisticsDataSaga()])
}
import {all} from "redux-saga/effects"
import {fetchSongsSaga} from "./songsSaga"
import { fetchSongsStatisticsSaga, fetchSongsStatisticsDataSaga } from "./songsStatisticsSaga"

export default function* rootSaga() {
    yield all([fetchSongsSaga(), fetchSongsStatisticsSaga(), fetchSongsStatisticsDataSaga()])
}
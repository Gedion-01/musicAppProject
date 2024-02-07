import {all} from "redux-saga/effects"
import {fetchSongsSaga} from "./songsSaga"

export default function* rootSaga() {
    yield all([fetchSongsSaga()])
}
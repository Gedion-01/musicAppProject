import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./songs/songsSlice";
import songsStatisticsReducer from "./songs/songsStatisticsSLice"
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    songsStatistics: songsStatisticsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

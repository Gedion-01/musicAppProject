import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./songs/songsSlice";
import songsStatisticsReducer from "./songs/songsStatisticsSlice"
import songsDataStatisticsReducer from "./songs/songsDataStatisticsSlice";
import playerSlice from "./songs/playerSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    songsStatistics: songsStatisticsReducer,
    songsDataStatistics: songsDataStatisticsReducer,
    playerData: playerSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

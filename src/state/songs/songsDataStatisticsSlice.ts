import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface genre {
  _id: string;
  count: number;
}

interface songDataStatistics {
  genreCounts: genre[];
  issongDataStatistics: boolean;
}

const initialState: songDataStatistics = {
  genreCounts: [],
  issongDataStatistics: true,
};

const songDataStatistics = createSlice({
  name: "statisticsData",
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<genre[]>) => {
      state.genreCounts = action.payload;
    },
    setIssongDataStatisticsLoading: (state, action: PayloadAction<boolean>) => {
      state.issongDataStatistics = action.payload;
    },
  },
});

export const { setGenres, setIssongDataStatisticsLoading } = songDataStatistics.actions;
export default songDataStatistics.reducer
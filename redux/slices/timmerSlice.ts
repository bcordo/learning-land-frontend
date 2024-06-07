import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minutes: 0,
  seconds: 0,
  totalSeconds: 0,
  pauseTimmer: false,
};

const timmerSlice = createSlice({
  name: "timmerSlice",
  initialState,
  reducers: {
    updateTime(state, { payload }) {
      state.minutes = payload.minutes;
      state.seconds = payload.seconds;
      state.totalSeconds = payload.totalSeconds;
    },
    updatePauseTimmer: (state, { payload }) => {
      state.pauseTimmer = payload;
    },
  },
});

export const { updateTime, updatePauseTimmer } = timmerSlice.actions;

export default timmerSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showMissionHistory:false
};

const missionHistory = createSlice({
  name: 'missionHistory',
  initialState,
  reducers: {
   updateShowMissionHistory(state,{payload}){
    state.showMissionHistory=payload
   },
  },
});

export const { updateShowMissionHistory } = missionHistory.actions;


export default missionHistory.reducer;

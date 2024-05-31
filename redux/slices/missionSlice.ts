
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mission:{}
};

const missionSlice = createSlice({
  name: 'missionSlice',
  initialState,
  reducers: {
   updateMission(state,{payload}){
    state.mission=payload
   },
  },
});

export const { updateMission } = missionSlice.actions;


export default missionSlice.reducer;

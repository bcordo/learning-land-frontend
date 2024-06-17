
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  worldLoader:true,
};

const loaderSlice = createSlice({
  name: 'loaderSlice',
  initialState,
  reducers: {
   updateLoader(state,{payload}){
    state.worldLoader=payload
   },
  },
});

export const { updateLoader } = loaderSlice.actions;


export default loaderSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    "mission_difficulty": "EASY",
    "show_translation": false,
    "show_hints": false,
    "slow_audio": false,
    "show_corrections": false,
    "default_audio_input": false,
    "user_id": 0,
    "use_memories": false,
    "id": 0,
    'isLoading':false
};

const userSettingsSlice = createSlice({
  name: 'userSettingsSlice',
  initialState,
  reducers: {
   updateUserSettings(state,{payload}){
    state.mission_difficulty= payload?.mission_difficulty,
    state.show_translation=payload?.show_translation,
    state.show_hints=payload?.show_hints,
    state.slow_audio=payload?.slow_audio,
    state.show_corrections=payload?.show_corrections,
    state.default_audio_input=payload?.default_audio_input,
    state.user_id=payload?.user_id,
    state.use_memories=payload?.use_memories,
    state.id=payload?.id
   },
   updateUserSettingsByType(state, { payload }) {
    const { type, value } = payload;
  (state as any)[type ] = value;
  },
   
    
  },
});

export const { updateUserSettings,updateUserSettingsByType} = userSettingsSlice.actions;


export default userSettingsSlice.reducer;

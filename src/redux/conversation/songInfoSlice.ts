import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SongInfoState {
  value: object | undefined;
}

const initialState: SongInfoState = {
  value: undefined,
};

export const songInfoSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setSong: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSong } = songInfoSlice.actions;

export default songInfoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SongInfoContext } from "../../types/reduxTypes";
import { SongType } from "../../types/types";

const initialState: SongInfoContext = {
  value: undefined,
};

export const songInfoSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSong: (state, action: PayloadAction<SongType>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSong } = songInfoSlice.actions;

export default songInfoSlice.reducer;

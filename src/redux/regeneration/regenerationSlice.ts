import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RegenerationContext } from "../../types/reduxTypes";

const initialState: RegenerationContext = {
  value: false,
};

const regenerationSlice = createSlice({
  name: "regeneration",
  initialState,
  reducers: {
    setRegeneration: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setRegeneration } = regenerationSlice.actions;

export default regenerationSlice.reducer;

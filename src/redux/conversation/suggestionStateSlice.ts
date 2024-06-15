import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SuggestionState {
  value: string;
}

const initialState: SuggestionState = {
  value: '',
};

export const suggestionStateSlice = createSlice({
  name: "suggestionState",
  initialState,
  reducers: {
    setSuggestion: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearSuggestion: (state) => {
      state.value = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSuggestion, clearSuggestion } = suggestionStateSlice.actions;

export default suggestionStateSlice.reducer;

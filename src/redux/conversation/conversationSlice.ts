import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ConversationState {
  value: Array<object>;
}

const initialState: ConversationState = {
  value: [],
};

export const conversationSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<object>) => {
      state.value.push(action.payload);
    },
    clearMessages: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessage, clearMessages } = conversationSlice.actions;

export default conversationSlice.reducer;

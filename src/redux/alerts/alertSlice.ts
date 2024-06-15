import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AlertContext {
  icon: string;
  message: string;
}

export interface AlertState {
  value: AlertContext;
}

const initialState: AlertState = {
  value: {
    icon: "",
    message: "",
  },
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertMessage: (state, action: PayloadAction<AlertContext>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAlertMessage } = alertSlice.actions;

export default alertSlice.reducer;

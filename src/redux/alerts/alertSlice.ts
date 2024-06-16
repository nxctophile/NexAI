import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AlertType } from "../../types/types";
import { AlertContext } from "../../types/reduxTypes";

const initialState: AlertContext = {
  value: {
    icon: "",
    message: "",
  },
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertMessage: (state, action: PayloadAction<AlertType>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAlertMessage } = alertSlice.actions;

export default alertSlice.reducer;

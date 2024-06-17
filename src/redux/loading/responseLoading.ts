import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ResponseLoadingContext } from "../../types/reduxTypes";

const initialState: ResponseLoadingContext = {
  value: false,
};

const responseLoadingSlice = createSlice({
  name: "responseLoading",
  initialState,
  reducers: {
    setResponseLoading: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setResponseLoading } = responseLoadingSlice.actions;

export default responseLoadingSlice.reducer;

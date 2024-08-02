import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SidebarStateContext } from "../../types/reduxTypes";

const initialState: SidebarStateContext = {
  value: true,
};

const sidebarStateSlice = createSlice({
  name: "sidebarState",
  initialState,
  reducers: {
    setSidebarState: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setSidebarState } = sidebarStateSlice.actions;

export default sidebarStateSlice.reducer;

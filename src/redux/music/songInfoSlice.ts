import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SongType } from "../../types/types";
import { SongInfoContext } from "../../types/reduxTypes";

const initialState: SongInfoContext = {
  value: {
      data: [
        {
          id: "",
          name: "",
          artists: {
            primary: [
              {
                name: "",
              },
            ],
          },
          image: [
            {
              url: "",
            },
            {
              url: "",
            },
            {
              url: "",
            },
          ],
          downloadUrl: [
            {
              url: "",
            },
            {
              url: "",
            },
            {
              url: "",
            },
          ],
          duration: 0,
        },
      ],
  },
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

import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./conversation/conversationSlice";
import songInfoReducer from "./conversation/songInfoSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    songInfo: songInfoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

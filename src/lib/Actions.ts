import { RefObject } from "react";
// import sendRequest from "./Request";
// import { Dispatch } from "@reduxjs/toolkit";
// import { ConversationType } from "../types/types";

export const edit = (inputRef: RefObject<HTMLInputElement>, message: string) => {
  return () => {
    if (inputRef.current) {
      inputRef.current.value = message;
      inputRef.current.focus();
    }
  };
};

// export const regenerate = (inputRef: RefObject<HTMLInputElement>, dispatch: Dispatch, conversation: ConversationType[], index: number) => {
//   return () => {
//     console.log(index);
//   };
// };

export const report = (index: number | undefined) => {
  return () => {
    console.log(index);
  };
};

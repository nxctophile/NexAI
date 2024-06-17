import { FormEvent, RefObject } from "react";
import {
  addMessage,
  setMessageAtIndex,
} from "../redux/conversation/conversationSlice";
import { setSong } from "../redux/music/songInfoSlice";
import { clearSuggestion } from "../redux/suggestions/suggestionStateSlice";
import { setResponseLoading } from "../redux/loading/ResponseLoading";
import { Dispatch } from "@reduxjs/toolkit";
import { ConversationType } from "../types/types";

export default function sendRequest(
  inputRef: RefObject<HTMLInputElement>,
  dispatch: Dispatch,
  conversation: ConversationType[],
  index: number | undefined = undefined,
  event: FormEvent<HTMLFormElement> | undefined = undefined
) {
  return async () => {
    if (event) event.preventDefault();

    const generateResponse = async (prompt: string) => {
      dispatch(setResponseLoading(true));

      const generatedResponse = await fetch(
        `http://nexai-server.vercel.app/api?prompt=${prompt}`
      );

      dispatch(setResponseLoading(false));

      if (generatedResponse.ok) return await generatedResponse.json();
      else return false;
    };

    if (inputRef.current) {
      const prompt = inputRef.current?.value ?? "";
      inputRef.current.value = "";
      dispatch(clearSuggestion());

      if (prompt.length > 0) {
        if (
          prompt.toLowerCase().includes("play") &&
          prompt.toLowerCase().includes("rhythmie")
        ) {
          dispatch(addMessage({ isPrompt: true, message: prompt }));
          dispatch(setResponseLoading(true));

          const filteredQuery = prompt
            .toLowerCase()
            .split("play")[1]
            .split("on rhythmie")[0]
            .trim();
          console.log("FQ: ", filteredQuery);

          const generatedResults = await fetch(
            `https://rhythmie-api.vercel.app/api/search?query=${filteredQuery}`
          );
          const parsedGeneratedResults = await generatedResults.json();

          const currentSong = parsedGeneratedResults.data.songs.results[0];

          const generatedResponse = await fetch(
            `https://rhythmie-api.vercel.app/api/songs/${currentSong.id}`
          );
          const parsedGeneratedResponse = await generatedResponse.json();

          dispatch(setSong(parsedGeneratedResponse));
          dispatch(
            addMessage({
              isPrompt: false,
              message: `Playing ${currentSong.title} by ${currentSong.primaryArtists} on Rhythmie`,
            })
          );

          if (!generatedResults.ok || !generatedResponse.ok)
            dispatch(
              addMessage({
                isPrompt: false,
                message:
                  "Sorry, I was unable to generate a response. Please try again.",
              })
            );
          dispatch(setResponseLoading(false));
        } else {
          dispatch(addMessage({ isPrompt: true, message: prompt }));

          if (!index) {
            const response = await generateResponse(prompt);
            if (response) {
              dispatch(
                addMessage({
                  isPrompt: false,
                  message: response.response,
                })
              );
            } else {
              dispatch(
                addMessage({
                  isPrompt: false,
                  message:
                    "Sorry, I was unable to generate a response. Please try again.",
                })
              );
            }
          }
        }
      } else {
        if (index) {
          console.log("here");
          const response = await generateResponse(conversation[index-1].message);
          dispatch(
            setMessageAtIndex({
              isPrompt: false,
              message: response.response,
              index: index,
            })
          );
        }
      }
    }
  };
}

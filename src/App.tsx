import { FormEvent, useEffect, useRef, useState } from "react";
import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import account from "./assets/account.png";
import InputBox from "./components/InputBox";
import Response from "./components/conversation/Response";
import ResponseLoading from "./components/loading/ResponseLoading";
import Prompt from "./components/conversation/Prompt";
import HeroSection from "./components/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { addMessage } from "./redux/conversation/conversationSlice";
import { setSong } from "./redux/conversation/songInfoSlice";
import RhythmieSuggestion from "./components/suggestions/RhythmieSuggestion";
import { clearSuggestion } from "./redux/conversation/suggestionStateSlice";

interface conversationType {
  isPrompt: boolean;
  message: string;
}

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);

  const conversation: conversationType = useSelector(
    (state: RootState) => state.conversation.value
  );

  const suggestionState = useSelector(
    (state: RootState) => state.suggestionState.value
  );

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const mainSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainSectionRef.current)
      mainSectionRef.current.scrollTop = mainSectionRef.current.scrollHeight;
  }, [conversation]);

  const sendRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          setLoading(true);

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

          console.log(parsedGeneratedResponse);

          if (!generatedResults.ok || !generatedResponse.ok)
            dispatch(
              addMessage({
                isPrompt: false,
                message:
                  "Sorry, I was unable to generate a response. Please try again.",
              })
            );
          setLoading(false);
        } else {
          dispatch(addMessage({ isPrompt: true, message: prompt }));
          setLoading(true);
          const generatedResponse = await fetch(
            `http://localhost:8080?prompt=${prompt}`
          );

          const parsedGeneratedResponse = await generatedResponse.json();
          console.log(parsedGeneratedResponse);
          dispatch(
            addMessage({
              isPrompt: false,
              message: parsedGeneratedResponse.response,
            })
          );

          if (!generatedResponse.ok)
            dispatch(
              addMessage({
                isPrompt: false,
                message:
                  "Sorry, I was unable to generate a response. Please try again.",
              })
            );
          setLoading(false);
        }
      }
    }
  };

  return (
    <main className="root-container">
      <Sidebar />

      <div className="button-container">
        <button className="account">
          <span className="material-symbols-outlined">share</span>
        </button>
        <button className="account">
          <img src={account} alt="Account" />
        </button>
      </div>

      <section className="main-container">
        {conversation.length === 0 && <HeroSection />}

        <section ref={mainSectionRef} className="main-section">
          {conversation.map((message, index) => {
            return message.isPrompt ? (
              <Prompt key={index} command={message.message} />
            ) : (
              <Response key={index} response={message.message} />
            );
          })}

          {loading && <ResponseLoading />}

          {suggestionState === "rhythmie" && <RhythmieSuggestion />}

          <InputBox sendRequest={sendRequest} inputRef={inputRef} />
        </section>
      </section>
    </main>
  );
}

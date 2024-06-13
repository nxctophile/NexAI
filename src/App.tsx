import { FormEvent, useRef, useState } from "react";
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

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);

  const conversation = useSelector(
    (state: RootState) => state.conversation.value
  );
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const sendRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = inputRef.current?.value ?? "";
    inputRef.current.value = "";

    if (prompt.length > 0) {

      if (prompt.toLowerCase().includes("play") && prompt.toLowerCase().includes("rhythmie")) {
        dispatch(addMessage({ isPrompt: true, message: prompt }));
        setLoading(true);

        const filteredQuery = prompt.toLowerCase().split("play")[1].split("on rhythmie")[0].trim();
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

        <section className="main-section">
          {conversation.map((message, index) => {
            return message.isPrompt ? (
              <Prompt key={index} command={message.message} />
            ) : (
              <Response key={index} response={message.message} />
            );
          })}

          {loading && <ResponseLoading />}

          <InputBox sendRequest={sendRequest} inputRef={inputRef} />
        </section>
      </section>
    </main>
  );
}

import { FormEvent, useRef } from "react";
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
import sendRequest from "./lib/Request";
import RhythmieSuggestion from "./components/suggestions/RhythmieSuggestion";
import { edit, report } from "./lib/Actions";
import { ConversationType } from "./types/types";

export default function App() {
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: RootState) => state.responseLoading.value
  );
  const conversation: ConversationType[] = useSelector(
    (state: RootState) => state.conversation.value
  );
  const suggestionState = useSelector(
    (state: RootState) => state.suggestionState.value
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const mainSectionRef = useRef<HTMLDivElement>(null);

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
        {conversation.length === 0 && (
          <HeroSection inputRef={inputRef} conversation={conversation} />
        )}

        <section ref={mainSectionRef} className="main-section">
          {conversation.map((message, index) => {
            return message.isPrompt ? (
              <Prompt
                key={index}
                command={message.message}
                edit={edit(inputRef, message.message)}
              />
            ) : (
              <Response
                key={index}
                response={message.message}
                isRegenerated={message.isRegenerated}
                regenerate={sendRequest(
                  inputRef,
                  dispatch,
                  conversation,
                  index
                )}
                report={report(index)}
              />
            );
          })}

          {loading && <ResponseLoading />}

          {suggestionState === "rhythmie" && <RhythmieSuggestion />}
          <InputBox
            sendRequest={(event: FormEvent<HTMLFormElement>) =>
              sendRequest(inputRef, dispatch, conversation, undefined, event)()
            }
            inputRef={inputRef}
          />
        </section>
      </section>
    </main>
  );
}

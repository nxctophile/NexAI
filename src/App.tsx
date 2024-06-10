import { useRef, useState } from "react";
import "./styles/App.css";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Sidebar from "./components/Sidebar";
import nex from "/nex-white-stroke-100.png";

export default function App() {
  const [response, setResponse] = useState<string | undefined>(undefined);
  const [command, setCommand] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const sendRequest = async (event) => {
    event.preventDefault();
    setCommand(inputRef.current.value);
    setLoading(true);
    const prompt = inputRef.current.value;
    const generatedResponse = await fetch(
      `http://localhost:8080?prompt=${prompt}`
    );
    const parsedGeneratedResponse = await generatedResponse.json();
    console.log(parsedGeneratedResponse);
    setResponse(parsedGeneratedResponse.response);
    inputRef.current.value = "";
    setLoading(false);
  };

  return (
    <main className="root-container">
      <Sidebar />

      <section className="main-container">
        <section className="main-section">
          <div className="command-container">
            {command && <div className="command">{command}</div>}
          </div>

          {loading && (
            <>
              <div className="nexai-response">
                <img className="nexai-logo" src={nex} alt="" />
                <div className="nexai-text">NexAI</div>
              </div>
              <img
                className="loading-icon"
                src="https://chatbot.rediff.com/public/typing.gif"
                alt="Loading..."
              />
            </>
          )}

          {response && (
            <div className="response">
              <div className="nexai-response">
                <img className="nexai-logo" src={nex} alt="" />
                <div className="nexai-text">NexAI</div>
              </div>

              <Markdown
                className="response-markdown"
                children={response}
                components={{
                  code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        style={twilight}
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </div>
          )}

          <form className="form" onSubmit={sendRequest}>
            <div className="user-input">
              <input
                className="textbox"
                ref={inputRef}
                type="text"
                placeholder="Ask me anything..."
              />
              <button className="send-button" type="submit">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}

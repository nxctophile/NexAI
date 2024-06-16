import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism";
import nex from "/nex-white-stroke-100.png";
import RhythmieComponent from "../music/RhythmieComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCallback, useEffect, useRef } from "react";
import { ResponseType } from "../../types/types";

export default function Response({ response }: ResponseType) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const copiedCodeRef = useRef<HTMLDivElement>(null);

  const equalityFunction = () => {
    return true;
  };

  const song = useSelector(
    (state: RootState) => state.songInfo.value,
    equalityFunction
  );

  const handleCopy = useCallback((code: string) => {
    navigator.clipboard.writeText(code);
    if (copiedCodeRef.current) {
      copiedCodeRef.current.style.opacity = "1";
      setTimeout(() => {
        if (copiedCodeRef.current) copiedCodeRef.current.style.opacity = "0";
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [response]);

  return (
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
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <>
                <div className="code-actions">
                  <button
                    onClick={() =>
                      handleCopy(String(children).replace(/\n$/, ""))
                    }
                    className="copy-button"
                  >
                    <span className="material-symbols-outlined">
                      content_copy
                    </span>
                  </button>
                  <div ref={copiedCodeRef} className="copied-code">
                    <span className="material-symbols-outlined">check</span>
                    Copied to clipboard
                  </div>
                </div>
                {/* @ts-expect-error - Adding this line to remove the unnecessary type warning*/}
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={twilight}
                  className="code-block"
                />
              </>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />

      {song && response?.includes("Rhythmie") && (
        <RhythmieComponent song={song} />
      )}

      <div className="response-actions">
        <button
          onClick={() => handleCopy(response)}
          className="response-action response-copy-button"
        >
          <span className="material-symbols-outlined">content_copy</span>
        </button>
        <button className="response-action response-regenerate-button">
          <span className="material-symbols-outlined">sync</span>
        </button>
        <button className="response-action response-report-button">
          <span className="material-symbols-outlined">report</span>
        </button>
        <div ref={copiedCodeRef} className="copied-code">
          <span className="material-symbols-outlined">check</span>
          Copied to clipboard
        </div>
      </div>

      <div ref={bottomRef} className="bottom"></div>
    </div>
  );
}

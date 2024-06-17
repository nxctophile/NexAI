import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism";
import nex from "/nex-white-stroke-100.png";
import RhythmieComponent from "../music/RhythmieComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useRef } from "react";
import { ResponseComponentTypes } from "../../types/types";

/**
 * Renders the response component with various interactive elements including copy to clipboard functionality, dynamic markdown rendering, and optional integration with the RhythmieComponent based on the response content.
 * @param {ResponseComponentTypes} props - The properties passed to the Response component, including the response to be displayed.
 * @returns The Response component populated with the provided response content, interactive elements, and potentially the RhythmieComponent.
 */

export default function Response({
  response,
  isRegenerated,
  regenerate,
  report,
}: ResponseComponentTypes) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const copiedCodeRef = useRef<HTMLDivElement>(null);

  /**
   * Equality function for useSelector to avoid unnecessary re-renders.
   * @returns {boolean} Always returns true indicating equality.
   */
  const equalityFunction = () => {
    return true;
  };

  const song = useSelector(
    (state: RootState) => state.songInfo.value,
    equalityFunction
  );
  const loading = useSelector(
    (state: RootState) => state.responseLoading.value,
    equalityFunction
  );

  /**
   * Copies the provided text to the clipboard and temporarily updates the UI to reflect the copy action.
   * @param {string} code The text to be copied to the clipboard.
   */
  const handleCopy = (code: string) => {
    return () => {
      navigator.clipboard.writeText(code);
      if (copiedCodeRef.current) {
        copiedCodeRef.current.style.opacity = "1";
        setTimeout(() => {
          if (copiedCodeRef.current) copiedCodeRef.current.style.opacity = "0";
        }, 1000);
      }
    };
  };

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [response]);

  return (
    <div className="response">
      <div className="nexai-response">
        <img className="nexai-logo" src={nex} alt="" />
        <div className="nexai-text">
          {isRegenerated && <> Re: </>}
          NexAI
        </div>
      </div>

      {!loading && (
        <>
          <Markdown
            className="response-markdown"
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <>
                    <div className="code-actions">
                      <button
                        onClick={handleCopy(
                          String(children).replace(/\n$/, "")
                        )}
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
                      language={match[1]}
                      style={twilight}
                      className="code-block"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {response}
          </Markdown>

          {song && response?.includes("Rhythmie") && (
            <RhythmieComponent song={song} />
          )}

          <div className="response-actions">
            <button
              onClick={handleCopy(response)}
              className="response-action response-copy-button"
            >
              <span className="material-symbols-outlined">content_copy</span>
            </button>
            <button
              onClick={regenerate}
              className="response-action response-regenerate-button"
            >
              <span className="material-symbols-outlined">sync</span>
            </button>
            <button
              onClick={report}
              className="response-action response-report-button"
            >
              <span className="material-symbols-outlined">report</span>
            </button>
            <div ref={copiedCodeRef} className="copied-code">
              <span className="material-symbols-outlined">check</span>
              Copied to clipboard
            </div>
          </div>
        </>
      )}

      <div ref={bottomRef} className="bottom" />
    </div>
  );
}

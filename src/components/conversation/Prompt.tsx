import { useEffect, useRef, useCallback } from "react";
import { PromptComponentTypes } from "../../types/types";

/**
 * Renders a prompt component with copy functionality and automatic scrolling to the latest command.
 * @param {PromptComponentTypes} props Contains the command to display and interact with in the prompt.
 * @returns {JSX.Element} A JSX element representing the prompt interface.
 */

export default function Prompt({ command, edit }: PromptComponentTypes) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const copiedTextRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    if (copiedTextRef.current) {
      copiedTextRef.current.style.opacity = "1";
      setTimeout(() => {
        if (copiedTextRef.current) copiedTextRef.current.style.opacity = "0";
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [command]);

  return (
    <div className="prompt-container">
      <div className="prompt-actions">
        <div ref={copiedTextRef} className="copied-prompt">
          <span className="material-symbols-outlined">check</span>
          Copied to clipboard
        </div>
        <button
          onClick={() => handleCopy(command)}
          className="prompt-action prompt-copy-button"
        >
          <span className="material-symbols-outlined">content_copy</span>
        </button>
        <button onClick={edit} className="prompt-action prompt-report-button">
          <span className="material-symbols-outlined">edit</span>
        </button>
      </div>

      <div className="prompt">{command}</div>
      <div ref={bottomRef} className="bottom" />
    </div>
  );
}

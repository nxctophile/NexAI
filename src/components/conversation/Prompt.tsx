import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
  useCallback,
} from "react";

export default function Prompt(props: {
  command:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const copiedTextRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    if (copiedTextRef.current) {
      copiedTextRef.current.style.opacity = "1";
      setTimeout(() => {
        copiedTextRef.current.style.opacity = "0";
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [props.command]);

  return (
    <div className="prompt-container">
      <div className="prompt-actions">
        <div ref={copiedTextRef} className="copied-prompt">
          <span className="material-symbols-outlined">check</span>
          Copied to clipboard
        </div>
        <button
          onClick={() => handleCopy(props.command)}
          className="prompt-action prompt-copy-button"
        >
          <span className="material-symbols-outlined">content_copy</span>
        </button>
        <button className="prompt-action prompt-report-button">
          <span className="material-symbols-outlined">edit</span>
        </button>
      </div>

      <div className="prompt">{props.command}</div>
      <div ref={bottomRef} className="bottom" />
    </div>
  );
}

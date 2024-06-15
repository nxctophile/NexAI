import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism";
import nex from "/nex-white-stroke-100.png";
import RhythmieComponent from "../music/RhythmieComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useRef } from "react";

export default function Response(props: {
  response: string | null | undefined;
}) {

  const bottomRef = useRef<HTMLDivElement>(null);

  const equalityFunction = (prev, next) => {
    return true;
  }

  const song = useSelector((state: RootState) => state.songInfo.value, equalityFunction);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [props.response]);

  return (
    <div className="response">
      <div className="nexai-response">
        <img className="nexai-logo" src={nex} alt="" />
        <div className="nexai-text">NexAI</div>
      </div>

      <Markdown
        className="response-markdown"
        children={props.response}
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
              <code {...rest} className={`${className} code-block`}>
                {children}
              </code>
            );
          },
        }}
      />
      
      {(song && props.response?.includes('Rhythmie')) && <RhythmieComponent song={song} />}

      <div ref={bottomRef} className="bottom"></div>
    </div>
  );
}

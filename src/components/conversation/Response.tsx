import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism";
import nex from "/nex-white-stroke-100.png";
import RhythmieComponent from "../music/RhythmieComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function Response(props: {
  response: string | null | undefined;
}) {
  const song = useSelector((state: RootState) => state.songInfo.value);

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
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
      
      {song && <RhythmieComponent song={song} />}
    </div>
  );
}

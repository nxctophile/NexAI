import { useDispatch } from "react-redux";
import {
  clearSuggestion,
  setSuggestion,
} from "../redux/suggestions/suggestionStateSlice";
import { InputBoxPropsType } from "../types/types";

export default function InputBox({ sendRequest, inputRef }: InputBoxPropsType) {
  const dispatch = useDispatch();
  const showSuggestion = (event: { target: { value: string } }) => {
    if (event.target.value.toLowerCase().includes("play")) {
      dispatch(setSuggestion("rhythmie"));
    } else {
      dispatch(clearSuggestion());
    }
  };
  return (
    <form className="form" onSubmit={sendRequest}>
      <div className="user-input">
        <input
          className="textbox"
          ref={inputRef}
          type="text"
          placeholder="Ask me anything..."
          onChange={showSuggestion}
        />
        <button className="send-button" type="submit">
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </form>
  );
}

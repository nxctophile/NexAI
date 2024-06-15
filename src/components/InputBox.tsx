import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { clearSuggestion, setSuggestion } from '../redux/conversation/suggestionStateSlice';

interface InputBoxProps {
  sendRequest: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function InputBox(props: InputBoxProps) {
  const dispatch = useDispatch();
  const showSuggestion = (event) => {
    if (event.target.value.toLowerCase().includes('play')) {
      dispatch(setSuggestion('rhythmie'));
    } else {
      dispatch(clearSuggestion());
    }
  }
  return (
    <form className="form" onSubmit={props.sendRequest}>
      <div className="user-input">
        <input
          className="textbox"
          ref={props.inputRef}
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

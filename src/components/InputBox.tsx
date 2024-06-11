import React, { FormEvent } from 'react';

interface InputBoxProps {
  sendRequest: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function InputBox(props: InputBoxProps) {
  return (
    <form className="form" onSubmit={props.sendRequest}>
      <div className="user-input">
        <input
          className="textbox"
          ref={props.inputRef}
          type="text"
          placeholder="Ask me anything..."
        />
        <button className="send-button" type="submit">
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </form>
  );
}

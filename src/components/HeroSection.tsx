import "../styles/components/HeroSection.css";
import nex from "/nex-white-stroke-100.png";
import code from "../assets/code.png";
import idea from "../assets/idea.png";
import quote from "../assets/quote.png";
import question from "../assets/question.png";
import sendRequest from "../lib/Request";
import { RefObject } from "react";
import { ConversationType } from "../types/types";
import { useDispatch } from "react-redux";

/**
 * Renders the hero section of the UI, including branding and action buttons.
 * @param {Object} props - Component properties.
 * @param {RefObject<HTMLInputElement>} props.inputRef - Reference to the input element.
 * @param {Dispatch} props.dispatch - Function to dispatch actions.
 * @param {ConversationType[]} props.conversation - Current conversation array.
 * @returns The hero section component with branding and interactive action buttons.
 */

export default function HeroSection({
  inputRef,
  conversation,
}: {
  inputRef: RefObject<HTMLInputElement>;
  conversation: ConversationType[];
}) {
  const dispatch = useDispatch();

  return (
    <section className="hero-section">
      <div className="branding">
        <img src={nex} alt="NexAI" />
        <div className="brand-name">NexAI</div>
        <div className="subtitle">How can I help you today?</div>
      </div>

      <form className="action-container">
        <button
          onClick={sendRequest(
            inputRef,
            dispatch,
            conversation,
            undefined,
            undefined,
            "What can you do?"
          )}
          type="submit"
          className="action"
        >
          <img className="action-icon" src={question} alt="Question" />
          <div className="action-title">What can NexAI do?</div>
        </button>
        <button
          onClick={sendRequest(
            inputRef,
            dispatch,
            conversation,
            undefined,
            undefined,
            "Can you help me fix a code?"
          )}
          type="submit"
          className="action"
        >
          <img className="action-icon" src={code} alt="Code" />
          <div className="action-title">Help me fix this code</div>
        </button>
        <button
          onClick={sendRequest(
            inputRef,
            dispatch,
            conversation,
            undefined,
            undefined,
            "Give some project ideas"
          )}
          type="submit"
          className="action"
        >
          <img className="action-icon" src={idea} alt="Idea" />
          <div className="action-title">Give me project ideas</div>
        </button>
        <button
          onClick={sendRequest(
            inputRef,
            dispatch,
            conversation,
            undefined,
            undefined,
            "Can you write an essay for me?"
          )}
          type="submit"
          className="action"
        >
          <img className="action-icon" src={quote} alt="Quote" />
          <div className="action-title">Write an essay for me</div>
        </button>
      </form>
    </section>
  );
}

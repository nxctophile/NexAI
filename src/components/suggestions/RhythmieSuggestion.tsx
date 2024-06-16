import "../../styles/components/suggestions/RhythmieSuggestion.css";

import { useDispatch } from "react-redux";
import { clearSuggestion } from "../../redux/suggestions/suggestionStateSlice";

import rhythmieLogo from "../../assets/Rhythmie/rhythmie-logo.png";

export default function RhythmieSuggestion() {
  const dispatch = useDispatch();

  return (
    <div className="rhythmie-suggestion-container">
      <img className="rhythmie-logo" src={rhythmieLogo} alt="Rhythmie logo" />
      <div className="rhythmie-suggestion-text">
        Wanna play the song using Rhythmie?
      </div>
      <button onClick={() => dispatch(clearSuggestion())} className="x-button">
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
}

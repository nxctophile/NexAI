import '../styles/components/HeroSection.css';
import nex from "/nex-white-stroke-100.png";
import code from "../assets/code.png";
import idea from "../assets/idea.png";
import quote from "../assets/quote.png";
import question from "../assets/question.png";

export default function HeroSection() {


  return (
    <section className="hero-section">
      <div className="branding">
        <img src={nex} alt="NexAI" />
        <div className="brand-name">NexAI</div>
        <div className="subtitle">
            How can I help you today?
        </div>
      </div>
      
      <form className="action-container">
        <button type="submit" className="action">
          <img className="action-icon" src={question} alt="Question" />
          <div className="action-title">What can NexAI do?</div>
        </button>
        <button type="submit" className="action">
          <img className="action-icon" src={code} alt="Code" />
          <div className="action-title">Help me fix this code</div>
        </button>
        <button type="submit" className="action">
          <img className="action-icon" src={idea} alt="Idea" />
          <div className="action-title">Give me project ideas</div>
        </button>
        <button type="submit" className="action">
          <img className="action-icon" src={quote} alt="Quote" />
          <div className="action-title">Write an essay for me</div>
        </button>
      </form>
    </section>
  );
}

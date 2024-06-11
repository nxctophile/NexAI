import nex from "/nex-white-stroke-100.png";

export default function ResponseLoading() {
  return (
    <div className="response">
      <div className="nexai-response">
        <img className="nexai-logo" src={nex} alt="" />
        <div className="nexai-text">NexAI</div>
      </div>
      <img
        className="loading-icon"
        src="https://chatbot.rediff.com/public/typing.gif"
        alt="Loading..."
      />
    </div>
  );
}

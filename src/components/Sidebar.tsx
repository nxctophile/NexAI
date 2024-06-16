import "../styles/Sidebar.css";

import { useDispatch } from "react-redux";
import { clearMessages } from "../redux/conversation/conversationSlice";

import arrow from "../assets/arrow.png";

export default function Sidebar() {
  const dispatch = useDispatch();

  return (
    <nav className="sidebar">
      <button className="collapse-sidebar">
        <img src={arrow} alt="" />
      </button>
      <button onClick={() => dispatch(clearMessages())} className="new-chat">
        <span className="material-symbols-outlined sidebar-logo">
          add_circle
        </span>
        <div className="sidebar-title">New chat</div>
      </button>
      <div className="login-container">
        <button className="login">
          <span className="material-symbols-outlined">login</span>
          <div className="login-title">Login to save chats</div>
        </button>
      </div>
      <div className="settings">
        <span className="material-symbols-outlined">settings</span>
        <div className="settings-title">Settings</div>
      </div>
    </nav>
  );
}

import "../styles/Sidebar.css";

import { useDispatch } from "react-redux";
import { clearMessages } from "../redux/conversation/conversationSlice";

import arrow from "../assets/arrow.png";
import { useRef, useState } from "react";

export default function Sidebar() {
  const dispatch = useDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const collapseSidebarRef = useRef<HTMLButtonElement>(null);
  const [sidebarState, setSidebarState] = useState(true);

  const toggleSidebar = () => {
    if (sidebarRef.current && collapseSidebarRef.current) {
      if (sidebarState) {
        sidebarRef.current.style.width = "0vw";
        collapseSidebarRef.current.style.left = "0.2vw";
        collapseSidebarRef.current.style.transform = "translateY(-50%) rotate(-180deg)";
      } else {
        sidebarRef.current.style.width = "17vw";
        collapseSidebarRef.current.style.left = "15.2vw";
        collapseSidebarRef.current.style.transform = "translateY(-50%)";
      }
      setSidebarState(!sidebarState);
    }
  }

  return (
    <nav ref={sidebarRef} className="sidebar">
      <button ref={collapseSidebarRef} onClick={toggleSidebar} className="collapse-sidebar">
        <img src={arrow} alt="arrow" />
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

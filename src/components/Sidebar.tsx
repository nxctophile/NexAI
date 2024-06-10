import "../styles/Sidebar.css";
import arrow from '../assets/arrow.png';

export default function Sidebar() {
  return (
    <nav className="sidebar">
        <button className="collapse-sidebar">
            <img src={arrow} alt='' />
        </button>
        <button className="new-chat">
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

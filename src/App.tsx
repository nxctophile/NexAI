import { useRef, useState } from 'react';
import './styles/App.css'
import Markdown from 'react-markdown';

export default function App () {

  const [response, setResponse] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const sendRequest = async (event) => {
    event.preventDefault();
    setLoading(true);
    const prompt = inputRef.current.value;
    const generatedResponse = await fetch(`http://localhost:8080?prompt=${prompt}`);
    const parsedGeneratedResponse = await generatedResponse.json();
    console.log(parsedGeneratedResponse)
    setResponse(parsedGeneratedResponse.response);
    inputRef.current.value = '';
    setLoading(false);
  }

  return (
    <main className="root-container">
    <section className="main-container">
      <section className="navigation-section">
        <button id="close" className="nav-button">
          <span className="material-symbols-outlined">
            close
          </span>
        </button>
        <button id="minimize" className="nav-button minimize">
          <span className="material-symbols-outlined">
            minimize
          </span>
        </button>
        <button id="restore" className="nav-button restore">
          <span className="material-symbols-outlined">
            select_window_2
          </span>
        </button>
      </section>
      <section className="main-section">
        <div className="command">
          <div className="path">
            root@nexai~$
          </div>

          <form onSubmit={sendRequest}>
            <input className="user-input" ref={inputRef} type="text" />
          </form>
        </div>

        {loading &&

          <img className="loading-icon" src="https://chatbot.rediff.com/public/typing.gif" alt="Loading..." />

        }
        {response &&
      
          <div className="command">
            <Markdown className="nothing">
              {response}
            </Markdown>
          </div>
        }

      </section>
    </section>
    </main>
  )
}
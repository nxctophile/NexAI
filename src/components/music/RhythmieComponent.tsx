import "../../styles/components/music/RhythmieComponent.css";
import pauseButton from "../../assets/Rhythmie/pause-buttonx32.png";
import playButton from "../../assets/Rhythmie/play-buttonx32.png";
import { useEffect, useRef, useState } from "react";

export default function RhythmieComponent({ song }) {
  const url = `https://rhythmie.live/browse/song?id=${song.data[0].id}`;
  // const audio = document.getElementById("audio");
  // const seekbar = document.getElementById("seekbar");
  const [playState, setPlayState] = useState(true);

  const audioRef = useRef(undefined);
  const seekbarRef = useRef(undefined);


let currentAudioSrc;
let totalDuration = song.data[0].duration;

const [songButton, setSongButton] = useState(playButton);

let interval: ReturnType<typeof setInterval>;

const updateSeek = () => {
  if (audioRef.current) audioRef.current.currentTime = Number(seekbarRef.current.value);
};

const playPause = () => {
  const audio = audioRef.current;
  const seekbar = seekbarRef.current;
  if (playState) {
    audio
      .play()
      .then(() => {
        interval = setInterval(() => {
          seekbar.value = String(audio.currentTime);

          if (audio.currentTime >= totalDuration) {
            clearInterval(interval);
            setPlayState(false);
            setSongButton(playButton);
          }
        }, 500);

        setPlayState(false);
        setSongButton(pauseButton);
      })
      .catch((error) => {
        console.error("currentElement play failed:", error);
      });
  } else {
    audio.pause();
    clearInterval(interval); // Clear the interval when pausing
    setPlayState(true);
    setSongButton(playButton);
  }
};

useEffect(() => {
  const audio = audioRef.current;
  if (audio && song.data[0].downloadUrl[2].url !== currentAudioSrc) {
    setPlayState(true);
    currentAudioSrc = song.data[0].downloadUrl[2].url;
    audio.src = currentAudioSrc; // Set the new audio source
    audio.load(); // Load the new audio source

    audio.oncanplay = () => {
      playPause();
    };
  }
}, [audioRef, song]);

  return (
    <section className="rhythmie-container">
      {song.data[0] && (
        <>
          <audio ref={audioRef} id="audio" src={song.data[0].downloadUrl[2].url}></audio>
          <div
            style={{ backgroundImage: `url(${song.data[0].image[2].url})` }}
            className="rhythmie"
          >
            <div className="rhythmie-contents">
              <div className="song-image">
                <img src={song.data[0].image[1].url} alt="Album art" />
              </div>

              <div className="song-info">
                <div className="song-title">{song.data[0].name}</div>
                <div className="song-artist">
                  {song.data[0].artists.primary[0].name}
                </div>
              </div>

            <div className="total-seek">
                <input
                    ref={seekbarRef}
                    id="seekbar"
                    onInput={updateSeek}
                    className="seekbar"
                    type="range"
                    min="0"
                    max={totalDuration}
                    step="1"
                    value="0"
                />
            </div>

              <div className="music-controls">
                <button onClick={playPause} className="play-button">
                  <img src={songButton} alt="Play Button" />
                </button>
              </div>

            </div>
          </div>

          <div className="goto-rhythmie-container">
            <a href={url} target="_blank" rel="noreferrer">
              <button className="goto-rhythmie">
                <span className="material-symbols-outlined">open_in_new</span>
              </button>
            </a>
          </div>
        </>
      )}
    </section>
  );
}

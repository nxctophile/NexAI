import "../../styles/components/music/RhythmieComponent.css";
import pauseButton from "../../assets/Rhythmie/pause-buttonx32.png";
import playButton from "../../assets/Rhythmie/play-buttonx32.png";
import { useEffect, useState } from "react";

export default function RhythmieComponent({ song }) {
  const url = `https://rhythmie.live/browse?id=${song.data[0].id}`;
  const audio = document.getElementById("audio");
  const seekbar = document.getElementById("seekbar");

  let playState = true;
  let currentAudioSrc;
  let currentDuration;
  let totalDuration = song.data[0];

  const [songButton, setSongButton] = useState(playButton);

let interval: ReturnType<typeof setInterval>;

const updateSeek = () => {
    playPause();
    if (currentElement) currentElement.currentTime = Number(seekbar.value);
};

  const playPause = () => {
    if (playState) {
      audio
        .play()
        .then(() => {
          interval = setInterval(() => {
            seekbar.value = String(audio.currentTime);

            if (audio.currentTime >= totalDuration) {
              clearInterval(interval);
              playState = false;
              playPause();
              playState = true;
            }
          }, 500);

          playState = false;
          setSongButton(pauseButton);
        })
        .catch((error) => {
          console.error("currentElement play failed:", error);
        });
    } else {
      audio.pause();
      // clearInterval(interval);
      playState = true;
      setSongButton(playButton);
    }
  };

  useEffect(() => {
    if (audio && song.data[0].downloadUrl[2].url !== currentAudioSrc) {
      playState = true;
      currentAudioSrc = song.data[0].downloadUrl[2].url;
      audio.src = currentAudioSrc; // Set the new audio source
      audio.load(); // Load the new audio source
      console.log(2);

      audio.oncanplay = () => {
        // Play the audio when it is ready to play
        console.log(3);
        playPause();
      };
    }
  }, [audio]);

  return (
    <section className="rhythmie-container">
      {song.data[0] && (
        <>
          <audio id="audio" src={song.data[0].downloadUrl[2].url}></audio>
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

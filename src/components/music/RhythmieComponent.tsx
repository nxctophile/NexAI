import "../../styles/components/music/RhythmieComponent.css";
import pauseButton from "../../assets/Rhythmie/pause-buttonx32.png";
import playButton from "../../assets/Rhythmie/play-buttonx32.png";
import { useCallback, useEffect, useRef, useState } from "react";
import { SongType } from "../../types/types";

/**
 * This function component renders the player and UI for a given song.
 * It handles play/pause actions, updating the seekbar, and loading new song data.
 * @param {SongType} props - The props containing song information to be rendered.
 * @returns The component returns a section element containing the song player UI.
 */

export default function RhythmieComponent({ song }: { song: SongType }) {
  const [playState, setPlayState] = useState(true);
  const [songButton, setSongButton] = useState(playButton);

  const audioRef = useRef<HTMLAudioElement>(null);
  const seekbarRef = useRef<HTMLInputElement>(null);
  const currentAudioSrc = useRef<string>("");
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const totalDuration = song.data[0].duration;
  const url = `https://rhythmie.live/browse/song?id=${song.data[0].id}`;

  /**
   * Updates the current time of the audio player to match the seekbar's value.
   */
  const updateSeek = () => {
    if (audioRef.current && seekbarRef.current)
      audioRef.current.currentTime = Number(seekbarRef.current.value);
  };

  /**
   * Toggles between playing and pausing the audio.
   * It updates the UI accordingly and handles the audio playback.
   */
  const playPause = useCallback(() => {
    const audio: HTMLAudioElement | null = audioRef.current;
    const seekbar = seekbarRef.current;
    if (audio && seekbar) {
      if (playState) {
        audio
          .play()
          .then(() => {
            intervalRef.current = setInterval(() => {
              seekbar.value = String(audio.currentTime);

              if (audio.currentTime >= totalDuration) {
                clearInterval(intervalRef.current);
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
        clearInterval(intervalRef.current); // Clear the interval when pausing
        setPlayState(true);
        setSongButton(playButton);
      }
    }
  }, [playState, totalDuration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && song.data[0].downloadUrl[2].url !== currentAudioSrc.current) {
      setPlayState(true);
      currentAudioSrc.current = song.data[0].downloadUrl[2].url;
      audio.src = currentAudioSrc.current; // Set the new audio source
      audio.load(); // Load the new audio source

      audio.oncanplay = () => {
        playPause();
      };
    }
  }, [audioRef, playPause, song]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="rhythmie-container">
      {song.data[0] && (
        <>
          <audio
            ref={audioRef}
            id="audio"
            src={song.data[0].downloadUrl[2].url}
          >
            <track kind="captions" />
          </audio>
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

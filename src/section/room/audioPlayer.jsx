import { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import {
  PauseCircleOutlined,
  MutedOutlined,
  PlayCircleOutlined,
  SoundOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  StepBackwardOutlined, // Import for previous track
  StepForwardOutlined, // Import for next track
} from "@ant-design/icons";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#ccc",
  progressColor: "#0178ff",
  cursorColor: "transparent",
  responsive: true,
  height: 80,
  normalize: true,
  backend: "WebAudio",
  barWidth: 2,
  barGap: 3,
});

function formatTime(seconds) {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}

export default function AudioPlayer({ audioFiles }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioFileName, setAudioFileName] = useState("");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Track index state

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(audioFiles[currentTrackIndex]); // Load current track

    wavesurfer.current.on("ready", () => {
      setVolume(wavesurfer.current.getVolume());
      setDuration(wavesurfer.current.getDuration());
      setAudioFileName(audioFiles[currentTrackIndex].split("/").pop());
    });

    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    return () => {
      wavesurfer.current.destroy();
      wavesurfer.current.un("audioprocess");
      wavesurfer.current.un("ready");
    };
  }, [audioFiles, currentTrackIndex]); // Depend on currentTrackIndex

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    wavesurfer.current.setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleMute = () => {
    setMuted(!muted);
    wavesurfer.current.setVolume(muted ? volume : 0);
  };

  const handleVolumeUp = () => {
    handleVolumeChange(Math.min(volume + 0.1, 1));
  };

  const handleVolumeDown = () => {
    handleVolumeChange(Math.max(volume - 0.1, 0));
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
  };

  const handlePreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? audioFiles.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="p-4 ">
      <div
        id="waveform"
        ref={waveformRef}
        className="mb-4"
        style={{ width: "100%" }}
      ></div>
      <div className="flex items-center justify-center space-x-4 mb-2">
        <button
          onClick={handlePreviousTrack}
          className="text-blue-500 hover:text-blue-700"
        >
          <StepBackwardOutlined /> {/* Previous track icon */}
        </button>
        <button
          onClick={handlePlayPause}
          className="text-blue-500 hover:text-blue-700"
        >
          {playing ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
        </button>
        <button
          onClick={handleNextTrack}
          className="text-blue-500 hover:text-blue-700"
        >
          <StepForwardOutlined /> {/* Next track icon */}
        </button>
        
        <button
          onClick={handleMute}
          className="text-blue-500 hover:text-blue-700"
        >
          {muted ? <MutedOutlined /> : <SoundOutlined />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={muted ? 0 : volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-24"
        />
        <button
          onClick={handleVolumeDown}
          className="text-blue-500 hover:text-blue-700"
        >
          <MinusCircleOutlined />
        </button>
        <button
          onClick={handleVolumeUp}
          className="text-blue-500 hover:text-blue-700"
        >
          <PlusCircleOutlined />
        </button>
      </div>
      <div className="text-sm text-gray-600 text-center">
        <span>Playing: {audioFileName}</span>
        <br />
        <span>
          Duration: {formatTime(duration)} | Current Time:{" "}
          {formatTime(currentTime)}
        </span>
        <br />
        <span>Volume: {Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
}

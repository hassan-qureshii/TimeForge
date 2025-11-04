import { useState, useEffect } from "react";
import { FaPlay, FaPause, FaRedo, FaFlagCheckered } from "react-icons/fa";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = (milliseconds % 1000) / 10;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(ms).padStart(2, "0")}`;
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps((prev) => [...prev, formatTime(time)]);
    }
  };

  return (
    <div className="stopwatch-container">
      <h1 className="heading">Stop Watch</h1>
      <div className="time-display">{formatTime(time)}</div>
      <div className="buttons">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`start-stop ${isRunning ? "pause" : "start"}`}
        >
          {isRunning ? <FaPause /> : <FaPlay />} {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            setTime(0);
            setIsRunning(false);
            setLaps([]);
          }}
          className="reset"
        >
          <FaRedo /> Reset
        </button>

        <button onClick={handleLap} className="lap-btn">
          <FaFlagCheckered /> Lap
        </button>
      </div>

      {laps.length > 0 && (
        <ul className="lap-list">
          {laps.map((lap, index) => (
            <li key={index}>
              Lap {index + 1}: <span>{lap}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

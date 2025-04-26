import { useState, useEffect } from "react";
import "./App.css"; 

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

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
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(ms).padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch-container" >
     <h1 className="heading"  class="cssanimation hu__hu__">Stop Watch</h1>
      <div className="time-display">{formatTime(time)}</div>
      <div className="buttons">
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className="start-stop"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button 
          onClick={() => { setTime(0); setIsRunning(false); }}
          className="reset"
        >
          Reset
        </button>
      </div>
    </div>
  );
}


export default Stopwatch

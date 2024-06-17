import { useEffect, useState } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(86400000); // 24 hours in milliseconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 10); // Decrease time by 10 milliseconds
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(86400000); // Reset time to 24 hours
  };

  useEffect(() => {
    const storedTime = localStorage.getItem('stopwatchTime');
    const storedIsActive = localStorage.getItem('stopwatchIsActive');

    if (storedTime && storedIsActive) {
      setTime(Number(storedTime));
      setIsActive(JSON.parse(storedIsActive));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stopwatchTime', time.toString());
    localStorage.setItem('stopwatchIsActive', isActive.toString());
  }, [time, isActive]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="text-3xl font-bold mb-4">{formatTime(time)}</div>
      <div className="space-x-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleStartStop}>
          {isActive ? 'Stop' : 'Start'}
        </button>
        <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
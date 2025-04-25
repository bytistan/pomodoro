import React from 'react';

export default function Timer({ timeLeft }) {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="position-relative p-3 bg-white rounded-4 d-flex justify-content-center align-items-center">
      <p className="clock-text fw-bold">{formatTime(timeLeft)}</p>
      <p className="text-gray position-absolute top-0 end-0 fs-5 fw-bold p-3">1/4</p>
    </div>
  );
}

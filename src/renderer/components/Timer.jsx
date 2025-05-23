import React, { useEffect } from 'react';

export default function Timer({ 
    timeLeft,
    totalSetNumber, 
    leftSetNumber,
}) {
    const formatTime = (seconds) => {
        if (!seconds) {
            return '00:00';
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="h-100 w-100 position-relative p-3 bg-white rounded-4 d-flex justify-content-center align-items-center">
            <p className="clock-text fw-bold">{formatTime(timeLeft)}</p>
            <p className="text-gray position-absolute top-0 end-0 fs-5 fw-bold p-3">{leftSetNumber}/{totalSetNumber}</p>
        </div>
    );
}

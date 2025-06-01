import React from 'react';
import BatteryIcon from "../assets/icons/battery.svg";

export default function CalendarPoint({ dateNumber, monthName, pointNumber = 0 }) {
    return (
        <div className="w-100 d-flex justify-content-start align-items-center gap-4 px-4 py-3 bottom-border-gray">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <p className="fs-2 fw-bold text-dark">{dateNumber}</p>
                <p className="text-gray fw-bold">{monthName}</p>
            </div>
            <div className="d-flex justify-content-start align-items-center gap-2 flex-wrap">
                {Array.from({ length: pointNumber }).map((_, index) => (
                    <img key={index} src={BatteryIcon} width="48" alt="Battery Icon" />
                ))}
            </div>
        </div>
    );
}

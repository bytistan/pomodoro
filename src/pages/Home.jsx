import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Timer from '../components/Timer';
import IconButton from '../components/IconButton';
import TextBubble from '../components/TextBubble';
import Character from '../components/Chracter';

import PlayIcon from '../assets/icons/play.svg';
import SettingsIcon from '../assets/icons/settings.svg';
import CalendarIcon from '../assets/icons/calendar.svg';
import PauseIcon from "../assets/icons/pause.svg";
import CancelIcon from "../assets/icons/delete.svg";

export default function Home() {
    const [omegaStatus, setOmegaStatus] = useState("welcome");

    const [timeLeft, setTimeLeft] = useState(60 * 25);
    const [isRunning, setIsRunning] = useState(false);

    const [isVisiable, setIsVisiable] = useState(true);
    const [isCancelVisiable, setIsCancelVisiable] = useState(false);

    const handlePlayClick = () => {
        if (timeLeft === 0) {
            setTimeLeft(25 * 60);
        }

        setIsRunning(true);
        setIsVisiable(false);
        setIsCancelVisiable(false);
        setOmegaStatus("work");
    };

    const handlePauseClick = () => {
        setIsRunning(false);
        setIsCancelVisiable(true);
        setOmegaStatus("angry");
    };

    const handleCancelClick = () => {
        setIsRunning(false);
        setIsVisiable(true);

        setTimeLeft(25 * 60);
    }

    return (
        <div className="page-background d-flex flex-column vh-100">

            <main className="flex-grow-1 overflow-auto p-4 d-flex flex-column">
                <div className="flex-grow-1">
                    <Timer 
                        timeLeft={timeLeft} 
                        setTimeLeft={setTimeLeft} 
                        isRunning={isRunning} 
                        setIsRuning={setIsRunning}
                    />
                </div>

                <div className="flex-grow-1 d-flex justify-content-start align-items-center gap-2">
                    <Character status={omegaStatus}></Character>
                    <div className="d-flex justify-content-center align-items-start h-100">
                        <TextBubble status={omegaStatus} />
                    </div>
                </div>
            </main>

            <footer
                className={`d-flex justify-content-between align-items-center p-4 ${isVisiable ? '' : 'd-none'}`}
                style={{ height: '100px' }}
            >
                <Link to="/settings">               
                    <IconButton
                        icon={SettingsIcon}
                    />
                </Link>

                <IconButton
                    id="play-btn"
                    icon={PlayIcon}
                    onClick={handlePlayClick}
                />

                <Link to="/calendar">               
                    <IconButton
                        icon={CalendarIcon}
                    />
                </Link>
            </footer>

            <footer
                className={`d-flex justify-content-center align-items-center p-4 gap-4 ${isVisiable ? 'd-none' : ''}`}
                style={{ height: '100px' }}
            >
                <IconButton
                    icon={PauseIcon}
                    onClick={handlePauseClick}
                    className={isCancelVisiable ? 'd-none' : ''}
                />

                <IconButton
                    icon={PlayIcon}
                    onClick={handlePlayClick}
                    className={isCancelVisiable ? '' : 'd-none'}
                />

                <IconButton
                    icon={CancelIcon}
                    onClick={handleCancelClick}
                    className={isCancelVisiable ? '' : 'd-none'}
                />
            </footer>
        </div>
    );
}
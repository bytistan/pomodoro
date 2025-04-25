import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Timer from '../components/Timer';
import IconButton from '../components/IconButton';
import TextBubble from '../components/TextBubble';

import PlayIcon from '../assets/icons/play.svg';
import SettingsIcon from '../assets/icons/settings.svg';
import CalendarIcon from '../assets/icons/calendar.svg';
import PauseIcon from "../assets/icons/pause.svg";
import CancelIcon from "../assets/icons/delete.svg";

import OmegaStand from '../assets/img/omega-stand.png';
import OmegaRun from "../assets/img/omega-run.png";

export default function Home() {
    const navigate = useNavigate();

    const [bubbleText, setBubbleText] = useState("You can do it");

    const [isVisiable, setIsVisiable] = useState(true);
    const [isCancelVisiable, setIsCancelVisiable] = useState(false);

    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    const handlePlayClick = () => {
        if (timeLeft === 0) {
            setTimeLeft(25 * 60);
        }

        setIsRunning(true);
        setIsVisiable(false);
        setIsCancelVisiable(false);
    };

    const handlePauseClick = () => {
        setIsRunning(false);
        setIsCancelVisiable(true);
    };

    const handleSettingsClick = () => {
        navigate("/settings");
    };

    const handleCalenderClick = () => {
        navigate("/calendar");
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
                    <Timer timeLeft={timeLeft} isRunning={isRunning} />
                </div>

                <div className="flex-grow-1 d-flex justify-content-start align-items-center gap-2">
                    <img id="omage-img" src={OmegaStand} className="scale-omega"></img>
                    <div className="d-flex justify-conten-center align-items-start h-100">
                        <TextBubble text={bubbleText} />
                    </div>
                </div>
            </main>

            <footer
                className={`d-flex justify-content-between align-items-center p-4 ${isVisiable ? '' : 'd-none'}`}
                style={{ height: '100px' }}
            >
                <IconButton
                    id="settings-btn"
                    icon={SettingsIcon}
                    onClick={handleSettingsClick}
                />

                <IconButton
                    id="play-btn"
                    icon={PlayIcon}
                    onClick={handlePlayClick}
                />

                <IconButton
                    id="calender-btn"
                    icon={CalendarIcon}
                    onClick={handleCalenderClick}
                />
            </footer>

            <footer
                className={`d-flex justify-content-center align-items-center p-4 gap-4 ${isVisiable ? 'd-none' : ''}`}
                style={{ height: '100px' }}
            >
                <IconButton
                    id="stop-btn"
                    icon={PauseIcon}
                    onClick={handlePauseClick}
                    className={isCancelVisiable ? 'd-none' : ''}
                />

                <IconButton
                    id="play-btn"
                    icon={PlayIcon}
                    onClick={handlePlayClick}
                    className={isCancelVisiable ? '' : 'd-none'}
                />

                <IconButton
                    id="cancel-btn"
                    icon={CancelIcon}
                    onClick={handleCancelClick}
                    className={isCancelVisiable ? '' : 'd-none'}
                />
            </footer>
        </div>
    );
}
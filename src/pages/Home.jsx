import React, { useState, useEffect } from 'react';
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

import { useSettings } from './SettingsContext';

export default function Home() {   
    const { settingsData, setSettingsData } = useSettings();

    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        setTimeLeft(settingsData.work_time * 60)
    }, [settingsData]);

    const [omegaStatus, setOmegaStatus] = useState("welcome");

    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    const [leftSetNumber, setLeftSetNumber] = useState(1);

    const [isVisiable, setIsVisiable] = useState(true);
    const [isCancelVisiable, setIsCancelVisiable] = useState(false);

    const handlePlayClick = () => {
        if (timeLeft === 0) {
            setTimeLeft(settingsData.work_time * 60);
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
        
        setLeftSetNumber(1);
        setTimeLeft(settingsData.work_time * 60);
    };

    const handleTimeEnd = async () => {
        if (leftSetNumber >= settingsData.set_number) {
            setIsRunning(false);
            setLeftSetNumber(1);
            setTimeLeft(settingsData.work_time * 60);
            setIsVisiable(true);

            new window.electron.showNotification('Home', 'Pomodoro complete!', settingsData.is_sound);

        } else {
            setTimeLeft(
                isBreak ? settingsData.work_time * 60 : settingsData.break_time * 60
            );

            setIsBreak(!isBreak);

            if (!isBreak) {
                setLeftSetNumber(leftSetNumber + 1);
            }

            setOmegaStatus("break");

            new window.electron.showNotification(
                'Home', 
                'Pomodoro complete! Now it\'s time for a short break.',
                settingsData.is_sound
            );

            await window.db.addPointToday();
        }
    }

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    handleTimeEnd();

                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, isBreak]);
    
    return (
        <div className="page-background d-flex flex-column vh-100">

            <main className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-4">
                <div className="flex-grow-1">
                    <Timer
                        timeLeft={timeLeft}
                        totalSetNumber={settingsData.set_number}
                        leftSetNumber={leftSetNumber}
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
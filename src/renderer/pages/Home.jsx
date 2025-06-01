import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Timer from '../components/Timer';
import IconButton from '../components/IconButton';
import Character from '../components/Chracter';

import PlayIcon from '../assets/icons/play.svg';
import SettingsIcon from '../assets/icons/settings.svg';
import CalendarIcon from '../assets/icons/calendar.svg';
import PauseIcon from "../assets/icons/pause.svg";
import CancelIcon from "../assets/icons/delete.svg";
import PageLayout from '../components/PageLayout';

import { useSettings } from '../context/SettingsContext';
import { useTexts } from '../context/TextsContext'; 

export default function Home() {
    const { settingsData } = useSettings();
    const texts = useTexts(); 

    const [ timeLeft, setTimeLeft ] = useState(null);

    useEffect(() => {
        if(settingsData) {
            setTimeLeft(settingsData?.clock?.work_time * 60);
        }
    }, [settingsData]);

    if (!settingsData) {
        return <div>{texts.loading}</div>; 
    }

    const [omegaStatus, setOmegaStatus] = useState("welcome");

    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    const [leftSetNumber, setLeftSetNumber] = useState(1);

    const [isVisiable, setIsVisiable] = useState(true);
    const [isCancelVisiable, setIsCancelVisiable] = useState(false);

    const handlePlayClick = () => {
        if (timeLeft === 0) {
            setTimeLeft(settingsData?.clock?.work_time * 60);
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
        setTimeLeft(settingsData?.clock?.work_time * 60);
    };

    const isHandlingRef = useRef(false); 

    const handleTimeEnd = async () => {
        if (isHandlingRef.current) return; 
        isHandlingRef.current = true;      
    
        try {
            if (leftSetNumber >= settingsData?.clock?.set_number) {
                setIsRunning(false);
                setLeftSetNumber(1);
                setTimeLeft(settingsData?.clock?.work_time * 60);
                setIsVisiable(true);
    
                new window.electron.showNotification(
                    'Home',
                    texts.timer.completed, 
                    settingsData.clock.is_sound
                );
    
                await window.db.addPointToday();
            } else {
                setTimeLeft(
                    isBreak ? settingsData?.clock?.work_time * 60 : settingsData.clock.break_time * 60
                );
    
                setIsBreak(!isBreak);
    
                if (!isBreak) {
                    setLeftSetNumber(leftSetNumber + 1);
                }
    
                setOmegaStatus("break");
    
                new window.electron.showNotification(
                    'Home',
                    `${texts.timer.completed} ${texts.timer.breakTime}`, 
                    settingsData.clock.is_sound
                );
            }
        } catch (error) {
            console.error("❌ Error in handleTimeEnd:", error);
        } finally {
            isHandlingRef.current = false; 
        }
    };
    

    const intervalRef = useRef(null);

    useEffect(() => {
        if (!isRunning) return;
    
        intervalRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
    
                    handleTimeEnd();  
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning, isBreak]);
    

    return (
        <PageLayout>
            <main className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-4">
                <div className="flex-grow-1">
                    <Timer
                        timeLeft={timeLeft}
                        totalSetNumber={settingsData?.clock?.set_number}
                        leftSetNumber={leftSetNumber}
                    />
                </div>

                <div className="d-flex justify-content-start align-items-end gap-2">
                    <Character status={omegaStatus} text={texts.status[omegaStatus]} /> 
                </div>
            </main>

            <footer
                className={`d-flex justify-content-between align-items-center p-4 ${isVisiable ? '' : 'd-none'}`}
                style={{ height: '100px' }}
            >
                <Link to="/clock-settings">
                    <IconButton icon={SettingsIcon} />
                </Link>

                <IconButton
                    id="play-btn"
                    icon={PlayIcon}
                    onClick={handlePlayClick}
                />

                <Link to="/calendar">
                    <IconButton icon={CalendarIcon} />
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
        </PageLayout>
    );
}
import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';

import IconButton from '../components/IconButton';
import TextBubble from '../components/TextBubble';

import PlayIcon from '../assets/icons/play.svg';
import SettingsIcon from '../assets/icons/settings.svg';
import CalendarIcon from '../assets/icons/calendar.svg';
import OmegaStand from '../assets/img/omega-stand.png';

export default function Home() {
    const navigate = useNavigate();
    const [bubbleText, setBubbleText] = useState("You can do it");

    const handlePlayClick = () => {};
    const handleSettingsClick = () => {
        navigate("/settings");
    };
    const handleCalenderClick = () => {
        navigate("/calendar");
    };

    return (
        <div className="page-background d-flex flex-column vh-100">

            <main className="flex-grow-1 overflow-auto p-4 d-flex flex-column">
                <div className="flex-grow-1">  
                    <div className="position-relative bg-white p-3 rounded-4 d-flex justify-content-center align-items-center">
                        <p className="clock-text fw-bold">25:00</p>
                        <p className="text-gray position-absolute top-0 end-0 fs-5 fw-bold p-3">1/4</p>
                    </div>
                </div>

                <div className="flex-grow-1 d-flex justify-content-start align-items-center gap-2">
                    <img src={OmegaStand} className="scale-omega"></img>
                    <div className="d-flex justify-conten-center align-items-start h-100">
                        <TextBubble text={bubbleText} />
                    </div>
                </div>
            </main>

            <footer className="d-flex justify-content-between align-items-center p-4" style={{ height: '100px' }}>
                <div>
                    <IconButton id="settings-btn" icon={SettingsIcon} onClick={handleSettingsClick}/>
                </div>
                    <IconButton id="play-btn" icon={PlayIcon} onClick={handlePlayClick}/>
                <div>
                    <IconButton id="calender-btn" icon={CalendarIcon} onClick={handleCalenderClick}/>
                </div>
            </footer>
        </div>
    );
}
import React from 'react';
import IconButton from '../components/IconButton';

import PlayIcon from '../assets/icons/play.svg';
import SettingsIcon from '../assets/icons/settings.svg';
import CalenderIcon from '../assets/icons/calender.svg';
import OmegaStand from '../assets/img/omega-stand.png';

export default function Home() {
    return (
        <div className="page-background d-flex flex-column vh-100">

            <main className="flex-grow-1 overflow-auto p-4 d-flex flex-column">
                <div className="flex-grow-1">  
                    <div className="position-relative bg-white p-3 rounded-4 d-flex justify-content-center align-items-center">
                        <p className="clock-text fw-bold">25:00</p>
                        <p className="text-gray position-absolute top-0 end-0 fs-5 fw-bold p-3">1/4</p>
                    </div>
                </div>

                <div className="flex-grow-1">
                    <div>
                        <img src={OmegaStand}></img>
                    </div>
                </div>
            </main>

            <footer className="d-flex justify-content-between align-items-center p-4" style={{ height: '100px' }}>
                <div>
                    <IconButton icon={SettingsIcon} />
                </div>
                    <IconButton icon={PlayIcon} />
                <div>
                    <IconButton icon={CalenderIcon} />
                </div>
            </footer>
        </div>
    );
}
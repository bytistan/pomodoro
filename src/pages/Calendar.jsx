import React from 'react';
import { Link } from 'react-router-dom';

import IconButton from '../components/IconButton';

import BackIcon from '../assets/icons/back.svg';

import CalendarPoint from '../components/CalenderPoint';

export default function Calendar() {
    return (
        <div className="page-background d-flex flex-column vh-100">

            <main className="flex-grow-1 overflow-auto p-4 d-flex flex-column">
                <div className="gap-4 d-flex justify-content-start align-items-start flex-column bg-white flex-grow-1 rounded-4">
                    <CalendarPoint
                        pointNumber={5}
                        monthName={"may"}
                        dateNumber={5}
                    />
                </div>
            </main>

            <footer className="d-flex justify-content-start align-items-center p-4" style={{ height: '100px' }}>
                <Link to="/">                
                    <IconButton 
                        icon={BackIcon}
                    ></IconButton>
                </Link>
            </footer>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import IconButton from '../components/IconButton';

import BackIcon from '../assets/icons/back.svg';

import CalendarPoint from '../components/CalenderPoint';

export default function Calendar() {
    const [calendarData, setCalendarData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await db.getAll('points');
                const formattedData = data.map(item => {
                    const dateObj = new Date(item.date);
                    const day = dateObj.getDate();
                    const month = dateObj.toLocaleString('default', { month: 'short' });

                    return {
                        ...item,
                        day,
                        month
                    };
                });
                setCalendarData(formattedData);
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="page-background d-flex flex-column vh-100">

            <main className="flex-grow-1 overflow-auto p-4 d-flex flex-column">
                <div className="gap-4 d-flex justify-content-start align-items-start flex-column bg-white flex-grow-1 rounded-4">
                    {calendarData.map((item, index) => (
                        <CalendarPoint
                            pointNumber={item.points}
                            monthName={item.month}
                            dateNumber={item.day}
                        />
                    ))}
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
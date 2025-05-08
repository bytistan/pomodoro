import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import IconButton from '../components/IconButton';

import BackIcon from '../assets/icons/back.svg';

import CalendarPoint from '../components/CalenderPoint';
import Character from '../components/Chracter';
import PageLayout from '../components/PageLayout';

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
        <PageLayout>

            <main className="flex-grow-1 overflow-auto p-4 d-flex flex-column">
                {calendarData.length > 0 ? (
                    <div className="gap-4 d-flex justify-content-start align-items-start flex-column bg-white flex-grow-1 rounded-4 overflow-auto">
                        {calendarData.map((item, index) => (
                            <CalendarPoint
                                key={index}
                                pointNumber={item.points}
                                monthName={item.month}
                                dateNumber={item.day}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex-grow-1 d-flex justify-content-start align-items-end gap-2">
                        <Character status="empty_page" />
                    </div>
                )}
            </main>

            <footer className="d-flex justify-content-start align-items-center p-4" style={{ height: '100px' }}>
                <Link to="/">
                    <IconButton
                        icon={BackIcon}
                    ></IconButton>
                </Link>
            </footer>
        </PageLayout>
    );
}
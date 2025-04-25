import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';

export default function Calendar() {
    const navigate = useNavigate();

    return (
        <div className="page-background d-flex flex-column vh-100">

            <main className="flex-grow-1 overflow-auto p-4 d-flex flex-column">
            </main>

            <footer className="d-flex justify-content-between align-items-center p-4" style={{ height: '100px' }}>
            </footer>
        </div>
    );
}
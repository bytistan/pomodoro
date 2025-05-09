import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import ClockSettings from './pages/ClockSettings.jsx';
import AppSettings from './pages/AppSettings.jsx';
import Calendar from './pages/Calendar.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clock-settings" element={<ClockSettings />} />
      <Route path="/app-settings" element={<AppSettings/>}/>
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
}

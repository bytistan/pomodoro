import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Settings from './pages/Settings.jsx';
import Calendar from './pages/Calendar.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
}

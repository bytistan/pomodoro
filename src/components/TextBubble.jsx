import React from 'react';

export default function TextBubble({ text }) {
  return (
    <div className="bg-white rounded-bubble p-3 d-flex justify-content-center align-items-center">
        <p className="text-center fw-bold fs-5">{text}</p>
    </div>
  );
}

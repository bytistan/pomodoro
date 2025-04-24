import React from 'react';

export default function IconButton({ icon, onClick, className = '' }) {
  return (
    <button className={`default-button ${className}`} onClick={onClick}>
      <img src={icon} alt="icon"/>
    </button>
  );
}

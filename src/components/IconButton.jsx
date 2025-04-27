import React from 'react';

export default function IconButton({ icon, onClick, className = '' }) {
  return (
    <div className={`default-button ${className}`} onClick={onClick}>
      <img src={icon} alt="icon" className='default-button-icon'/>
    </div>
  );
}

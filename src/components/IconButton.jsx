import React from 'react';

export default function IconButton({ icon, onClick, className = '', isDisabled=false }) {
  return (
    <div className={`${isDisabled ? 'disabled-default-button' : 'default-button'} ${className}`} onClick={onClick}>
      <img src={icon} alt="icon" className='default-button-icon'/>
    </div>
  );
}

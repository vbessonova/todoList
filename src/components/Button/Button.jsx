import React from 'react';
import './Button.scss';

const Button = ({ disabled, nameButton, onClick, addClassName, handleKeyDown }) => {
  return(
    <button
      onClick={onClick}
      className={`btn ${addClassName ? addClassName : ''}`}
      onKeyPress={handleKeyDown}
      disabled={disabled ? disabled : null}
    >
      {nameButton}
    </button>
  )
}

export default Button
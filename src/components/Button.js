import React from 'react';
import './Button.css';


//display the buttons in the calculator i.e. numbers, symbols and other functions
const ButtonsValue = ({ label, className, onClick }) => {
  return (
    <button className={`button ${className}`} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export default ButtonsValue;
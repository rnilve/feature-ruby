import React, { useState, useEffect } from 'react';

type Props={
    message:string,
    duration?:number
}

const Toast = ({ message, duration = 3000 }:Props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className={`toast ${isVisible ? 'show' : 'hide'}`}>
      <div className="toast-content">{message}</div>
    </div>
  );
};

export default Toast;

import React from 'react';
import './notification.css';

const Notification = ({ message }) => {
  if (message === null) {
    <div className="nothing" />;
  }

  return <div className="notification"> {message} </div>;
};

export default Notification;

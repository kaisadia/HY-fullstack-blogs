import React from 'react';
import './errorNotification.css';

const ErrorNotification = ({ error }) => {
  if (error === null) {
    return;
  }

  return <div className="error"> {error} </div>;
};

export default ErrorNotification;

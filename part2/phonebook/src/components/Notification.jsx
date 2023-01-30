import React from 'react';

const Notification = ({ errorMessage }) => {
  if (!errorMessage.message) return null;

  return <div className={`alert ${errorMessage.type === 'error' ? 'error' : 'success'}`}>{errorMessage.message}</div>;
};

export default Notification;

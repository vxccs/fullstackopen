import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) return null;
  return (
    <div className={`alert ${notification.success ? 'success' : 'error'}`}>
      {notification.message}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.object,
};

export default Notification;

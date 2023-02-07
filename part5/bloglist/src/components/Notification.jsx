import PropTypes from 'prop-types';
import React from 'react';

const Notification = ({ notification }) => {
  if (!notification) return null;
  return <div className={`alert ${notification.success ? 'success' : 'error'}`}>{notification.message}</div>;
};

Notification.propTypes = {
  notification: PropTypes.object,
};

export default Notification;

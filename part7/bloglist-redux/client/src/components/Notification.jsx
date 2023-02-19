import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) return null;

  const notifStyle = notification.success
    ? 'absolute bottom-[20px] left-[20px] p-4 border border-green-400 bg-green-200 rounded-lg text-green-800'
    : 'absolute bottom-[20px] left-[20px] p-4 border border-red-400 bg-red-200 rounded-lg text-red-800';

  return <div className={notifStyle}>{notification.message}</div>;
};

export default Notification;

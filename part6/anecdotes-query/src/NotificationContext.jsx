import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload;
    case 'HIDE':
      return '';
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '');

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

let timer;
export const useTimedNotification = () => {
  const dispatch = useNotificationDispatch();
  return (payload) => {
    clearTimeout(timer);
    dispatch({ type: 'SHOW', payload });
    timer = setTimeout(() => dispatch({ type: 'HIDE' }), 5000);
  };
};

export default NotificationContext;

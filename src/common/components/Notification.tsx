import { initSocket, closeSocket } from '@lib/socket';
import { useState, useEffect } from 'react';

type Props = {
  className?: string;
};

const Notification: React.FC<Props> = ({ className }) => {
  const [notification, setNotification] = useState();

  useEffect(() => {
    const handleNotification = (message: any) => {
      setNotification(message);
    };

    initSocket(handleNotification);

    return () => {
      closeSocket();
    };
  }, []);

  return (
    <div>
      <h1>Notification</h1>
      {notification && <p>Notification: {notification}</p>}
    </div>
  );
};

export default Notification;

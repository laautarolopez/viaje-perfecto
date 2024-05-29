"use client"

import { useEffect } from 'react';
import io from 'socket.io-client';

const NotificationListener = ({ user_id }: {user_id: string | undefined}) => {
  useEffect(() => {
    const socket = io('http://localhost:3000', {
      query: { user: user_id },
    });

    socket.on('NEW_TRIP', ({ usuario }) => {
      new Notification('Nuevo viaje compartido contigo', {
        body: `El usuario ${usuario} compartió un viaje contigo.`,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [user_id]);

  return null;
};

export default NotificationListener;
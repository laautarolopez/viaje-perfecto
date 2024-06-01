"use client"

import { useEffect } from 'react';
import io from 'socket.io-client';

const NotificationListener = ({ user_id }: {user_id: string | undefined}) => {
  useEffect(() => {
    const socket = io('http://localhost:3000')

    socket.on('connect', () => {
      socket.emit('register', user_id);
    });

    socket.on('NEW_TRIP', (name) => {
      new Notification('Nuevo viaje compartido contigo', {
        body: `Se compartió un viaje contigo: *${name}*.`,
        icon: '/images/logo.jpeg'
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [user_id]);

  return null;
};

export default NotificationListener;
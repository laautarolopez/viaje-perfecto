"use client"

import { useEffect } from 'react';
import io from 'socket.io-client';

const NotificationListener = ({ user_id }: {user_id: string | undefined}) => {
  useEffect(() => {
    const socket = io('http://localhost:3000')

    socket.on('connect', () => {
      socket.emit('register', user_id);
    });

    socket.on('NEW_TRIP', ({name}) => {
      showNotification('Nuevo viaje compartido contigo', `Se compartió un viaje contigo: *${name}*.`)
    });

    socket.on('ACCEPT_TRIP', ({email, name}) => {
      showNotification('La invitación fue aceptada', `El usuario ${email} aceptó tu invitación del viaje ${name}.`)
    })

    socket.on('DECLINE_TRIP', ({email, name}) => {
      showNotification('La invitación fue rechazada', `El usuario ${email} rechazó tu invitación del viaje ${name}.`)
    })

    const showNotification = (titulo: string, mensaje: string) => {
      new Notification(titulo, {
        body: mensaje,
        icon: '/images/logo.jpeg'
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [user_id]);

  return null;
};

export default NotificationListener;
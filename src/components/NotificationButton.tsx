"use client"

import { useEffect } from 'react';

const NotificationButton = () => {
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    }
  }, []);

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Hola!', {
        body: 'Esta es una notificación de tu app Next.js',
        icon: '/images/logo.jpeg'
      });
    } else {
      console.log('No se han concedido permisos para mostrar notificaciones.');
    }
  };

  return (
    <button onClick={showNotification}>Mostrar Notificación</button>
  );
};

export default NotificationButton;
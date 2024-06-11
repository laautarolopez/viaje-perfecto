'use client'

import { useEffect } from 'react'

const NotificationsPermission = () => {
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.')
        } else {
          console.log('Notification permission denied.')
        }
      })
    }
  }, [])

  const showNotification = (titulo: string, mensaje: string) => {
    if (Notification.permission === 'granted') {
      new Notification(titulo, {
        body: mensaje,
        icon: '/images/logo.jpeg'
      })
    } else {
      console.log('No se han concedido permisos para mostrar notificaciones.')
    }
  }

  return <></>
}

export default NotificationsPermission

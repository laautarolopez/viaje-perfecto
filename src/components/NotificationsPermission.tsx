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

  return null
}

export default NotificationsPermission
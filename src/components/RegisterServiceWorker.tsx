'use client'
import { subscribePushNotifications } from '@/app/actions/notificationsQuerys'
import { useEffect } from 'react'

export default function RegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration)

          const publicVapidKey = `${process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY}`
          console.log('🚀 ~ .then ~ publicVapidKey:', publicVapidKey)
          const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey)
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey
            })
            .then(async (subscription) => {
              console.log('User is subscribed:', subscription)
              await subscribePushNotifications(subscription)
            })
          // registration.pushManager
          //   .subscribe({
          //     userVisibleOnly: true,
          //     applicationServerKey: 'BKK1Z9Q'
          //   })
          //   .then((subscription) => {
          //     console.log('User is subscribed:', subscription)
          //   })
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [])

  return null
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

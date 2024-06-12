'use client'
import { createSubscriptions } from '@/app/actions/subscriptions'
import { useEffect } from 'react'

export default function RegisterServiceWorker({user_id}: {user_id: string}) {
  useEffect(() => {
    const urlB64ToUint8Array = (base64String: string | any[]) => {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
      const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
      const rawData = atob(base64)
      const outputArray = new Uint8Array(rawData.length)
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    }

    const handlePermission = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('/service-worker.js')
          .catch((error) => {
            console.error('Service Worker registration failed:', error)
          })
          const registration = await navigator.serviceWorker.ready
          let subscription = await registration.pushManager.getSubscription()
          if (!subscription) {
            const publicVapidKey = `${process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY}`;
            const applicationServerKey = urlB64ToUint8Array(publicVapidKey);
            const options = { applicationServerKey, userVisibleOnly: true };
            subscription = await registration.pushManager.subscribe(options);
          }
          const subscriptionJson = subscription.toJSON()
          await createSubscriptions(user_id, subscriptionJson?.endpoint!!, subscriptionJson?.keys?.p256dh!!, subscriptionJson?.keys?.auth!!)
      }
    }

    handlePermission()
  }, [user_id])

  return null
}
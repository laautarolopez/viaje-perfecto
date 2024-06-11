'use server'
import { query } from '@/app/lib/db'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import * as webpush from 'web-push'

export type CreateNotificationProps = {
  user_id: string
  title: string
  message: string
}
console.log('jasdnasdjas', `${process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY}`)

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  `${process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY}`,
  `${process.env.VAPID_PRIVATE_KEY}`
)

// {
//     endpoint: 'https://fcm.googleapis.com/fcm/send/d4mVGlSXNlc:APA91bHoglADHU5l8kOMieQUASB8IpdO1Lwtw8WzABWhnjM9hg_WFqPkhvhB1IRpR0MuJfy3cYniy1qvloPE98EZoeu0LLFm8liXpKZhFGJ5MSjh71ULZmK3TsiZjQnfjflDA71ofL1w',
//     expirationTime: null,
//     keys: {
//       p256dh: 'BJnAzIG5FzePC3dnMf0o6q6DRgu8wv8P756W5Wjo1pZqRDBoa1wzqk0ZOTkyFH0Q-2nsFg-5g3kSmvbE2O-jeDE',
//       auth: 'Dbowr6D6QM1Z9S7zyMGv1w'
//     }
//   }

type Subscription = {
  endpoint: string
  expirationTime: null
  keys: {
    p256dh: string
    auth: string
  }
}

export const subscribePushNotifications = async (
  subscription: Subscription
) => {
  //send a push only to test
  console.log(subscription)
  const payload = JSON.stringify({ title: 'Test', message: 'Test message' })
  try {
    await webpush.sendNotification(subscription, payload)
    console.log('se manda')
  } catch (error) {
    console.log(error, 'mnp se manda')
  }
}

export const createNotification = async ({
  user_id,
  title,
  message
}: CreateNotificationProps) => {
  try {
    await query(
      'INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3)',
      [user_id, title, message]
    )
  } catch (error) {
    console.log(error)
    return { message: 'Error al guardar la notificación' }
  }
  revalidatePath(`/notifications`)
}

export const deleteNotification = async (notification_id: string) => {
  try {
    const data = await query('DELETE FROM notifications WHERE id = $1', [
      notification_id
    ])
    if (data.affectedRows <= 0) {
      return { message: 'No se encontró la notificación' }
    }
  } catch (error) {
    console.log(error)
    return { message: 'Error al eliminar la notificación' }
  }
  revalidatePath(`/notifications`)
}

export const getNotifications = async () => {
  const user_id = cookies().get('user_id')?.value

  try {
    const data = await query('SELECT * FROM notifications WHERE user_id = $1', [
      user_id
    ])
    return data.rows
  } catch (error) {
    console.log(error)
    return { message: 'Error al obtener las notificaciones del usuario' }
  }
}

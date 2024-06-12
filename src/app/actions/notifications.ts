'use server'
import { query } from '@/app/lib/db'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { getSubscriptions } from './subscriptions'
import * as webpush from 'web-push'

export type CreateNotificationProps = {
  user_id: string
  title: string
  message: string
}

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  `${process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY}`,
  `${process.env.VAPID_PRIVATE_KEY}`
)

export const sendNotification = async (user_id: string, title: string, message: string, visualNotification: boolean = true) => {
  const payload = JSON.stringify({ title, message })
  try {
    if(visualNotification) await createNotification({user_id, title, message})
    const subscription = await getSubscriptions(user_id)
    webpush.sendNotification(subscription, payload)
  } catch (error) {
    console.log(error, 'No se manda')
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

'use server'
import { query } from '@/app/lib/db'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export const createNotification = async (user_id: string, title: string, message: string) => {
    try {
        await query('INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3)', [user_id, title, message])
    } catch (error) {
        console.log(error)
        return { message: 'Error al guardar la notificación' }
    }
    revalidatePath(`/notifications`)
}

export const deleteNotification = async (notification_id: string) => {
    try {
        const data = await query('DELETE FROM notifications WHERE id = $1', [notification_id])
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
        const data = await query('SELECT * FROM notifications WHERE user_id = $1', [user_id])
        return data.rows
    } catch (error) {
        console.log(error)
        return { message: 'Error al obtener las notificaciones del usuario' }
    }
}
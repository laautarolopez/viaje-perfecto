'use server'
import { query } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { SharedTripCreateForm } from '../lib/types'

export async function createSharedTrip(newSharedTrip: SharedTripCreateForm) {
    const { trip_id, user_email } = newSharedTrip
    let user_id

    try {
        const data = await query('SELECT * FROM users WHERE email = $1', [user_email])

        if(data.rows.length > 0) {
            const user = data.rows[0]
            user_id = user.id
        } else {
            return { message: 'El usuario no existe' }
        }
    } catch (error) {
        console.log('Error compartiendo un viaje: ', error)
    }

    try {
        await query(
            `
                INSERT INTO shared_trips (trip_id, user_id)
                VALUES ($1, $2)
                ON CONFLICT (id) DO NOTHING;`,[trip_id, user_id]
        )
    } catch (error) {
        console.log('Error compartiendo un viaje: ', error)
    }

    revalidatePath(`/`)
    redirect(`/`)
}

export async function deleteSharedTrip(sharedTripId: string) {
    try {
        await query('DELETE FROM shared_trips WHERE id = $1', [sharedTripId])
    } catch (error) {
        console.log('🚀 ~ deleteSharedTrip ~ error:', error)
    }

    revalidatePath(`/`)
    redirect(`/`)
}
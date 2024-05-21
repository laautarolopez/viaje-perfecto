'use server'
import { query } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { SharedTripBasicInfo } from '../lib/types'

export async function createSharedTrip(newSharedTrip: SharedTripBasicInfo) {
    const { trip_id, user_id } = newSharedTrip

    try {
        await query(
            `
                INSERT INTO shared_trips (trip_id, user_id)
                VALUES ($1, $2)
                ON CONFLICT (id) DO NOTHING;`,[trip_id, user_id]
        )
    } catch (error) {
        console.log('🚀 ~ createSharedTrip ~ error:', error)
    }

    revalidatePath(`/`)
    redirect(`/`)
}

export async function deleteSharedTrip(newSharedTrip: SharedTripBasicInfo) {
    const { trip_id, user_id } = newSharedTrip

    try {
        await query('DELETE FROM shared_trips WHERE trip_id = $1 AND user_id = $2', [trip_id, user_id])
    } catch (error) {
        console.log('🚀 ~ deleteSharedTrip ~ error:', error)
    }

    revalidatePath(`/`)
    redirect(`/`)
}
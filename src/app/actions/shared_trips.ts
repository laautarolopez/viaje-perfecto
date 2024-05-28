'use server'
import { query } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { SharedTripBasicInfo, SharedUserWithStatus } from '../lib/types'
import { DatabaseError } from 'pg'
import { cookies } from 'next/headers'

type CreateSharedTripProps = {
  userEmail: string
  trip_id: string
}
export async function createSharedTrip({
  trip_id,
  userEmail
}: CreateSharedTripProps) {
  const userRes = await query('SELECT id FROM users WHERE email = $1', [
    userEmail
  ])
  const user_id = userRes.rows[0]?.id

  if (!user_id) {
    return { message: `No se encontró un usuario con el email ${userEmail}` }
  }
  const tripRes = await query('SELECT user_id FROM trips WHERE id = $1', [
    trip_id
  ])
  const trip_user_id = tripRes.rows[0]?.user_id
  if (trip_user_id === user_id) {
    return { message: 'No puedes compartir el viaje con el dueño del mismo' }
  }

  try {
    await query(
      `
                INSERT INTO shared_trips (trip_id, user_id)
                VALUES ($1, $2)
                ON CONFLICT (id) DO NOTHING;`,
      [trip_id, user_id]
    )
  } catch (error) {
    const errorCode = (error as DatabaseError)?.code
    if (errorCode === '23505') {
      return { message: 'El viaje ya está compartido con este usuario' }
    }
    return { message: 'Error al compartir el viaje' }
  }
  revalidatePath(`/${trip_id}/compartir`)
  return { message: '' }
}

export async function getSharedUsers(tripId: string) {
  const sharedUsersRes = await query(
    `
        SELECT users.email, users.id, shared_trips.accepted, shared_trips.id as "sharedId"
        FROM shared_trips
        JOIN users ON shared_trips.user_id = users.id
        WHERE shared_trips.trip_id = $1
    `,
    [tripId]
  )
  const sharedUsers: SharedUserWithStatus[] =
    sharedUsersRes.rows as SharedUserWithStatus[]

  return sharedUsers
}

export type TripsInvitationsResponse = {
  tripName: string
  tripId: string
  userEmail: string
  sharedId: string
}

export async function getTripsInvitations(): Promise<
  TripsInvitationsResponse[]
> {
  const user_id = cookies().get('user_id')?.value

  const tripsInvitationsRes = await query(
    `SELECT trips.name as "tripName", trips.id as "tripId", users.email as "userEmail", shared_trips.id as "sharedId"
    FROM shared_trips
    JOIN trips ON shared_trips.trip_id = trips.id
    JOIN users ON trips.user_id = users.id
    WHERE shared_trips.user_id = $1 AND shared_trips.accepted = false`,
    [user_id]
  )
  const tripsInvitations =
    tripsInvitationsRes.rows as TripsInvitationsResponse[]
  return tripsInvitations
}

export async function acceptInvitation(sharedId: string) {
  try {
    await query('UPDATE shared_trips SET accepted = true WHERE id = $1', [
      sharedId
    ])
  } catch (error) {
    console.log('🚀 ~ acceptInvitation ~ error:', error)
  }
  revalidatePath(`/notifications`)
}

export async function deleteSharedTrip(sharedId: string) {
  try {
    await query('DELETE FROM shared_trips WHERE id = $1', [sharedId])
  } catch (error) {
    console.log('🚀 ~ deleteSharedTrip ~ error:', error)
  }
  revalidatePath(`/notifications`)
}

export async function hasNotifications() {
  const user_id = cookies().get('user_id')?.value
  const tripsInvitationsRes = await query(
    `SELECT COUNT(*) as count
    FROM shared_trips
    WHERE user_id = $1 AND accepted = false`,
    [user_id]
  )
  return tripsInvitationsRes.rows[0].count > 0
}

'use server'
import { query } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { TripBasicInfo, Trip } from '../lib/types'
import { UUID } from 'crypto'
import { cookies } from 'next/headers'

export type RawTrip = {
  id: UUID
  user_id: UUID
  name: string
  initial_date: Date
  end_date: Date
}

export async function createTrip(newTrip: TripBasicInfo) {
  const user_id = cookies().get('user_id')?.value
  
  const { name, initial_date, end_date } = newTrip

  const { isValid, message } = validateTrip(newTrip)
  if (isValid) {
    try {
      await query(
        `
            INSERT INTO trips (user_id, name, initial_date, end_date)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) DO NOTHING;
        `,
        [user_id, name, initial_date, end_date]
      )
    } catch (error) {
      console.log('🚀 ~ createTrip ~ error:', error)
    }
    revalidatePath(`/`)
    redirect(`/`)
  } else {
    return { message }
  }
}

export async function updateTrip(trip: Trip) {
  const { id, name, initial_date, end_date } = trip

  const { isValid, message } = validateTrip(trip)
  if (isValid) {
    try {
      await query(
        `
              UPDATE trips
              SET name = $1, initial_date = $2, end_date = $3
              WHERE id = $4
          `,
        [name, initial_date, end_date, id]
      )
    } catch (error) {
      console.log('🚀 ~ updateTrip ~ error:', error)
    }
    revalidatePath(`/`)
    redirect(`/`)
  } else {
    return { message }
  }
}

export async function getTripById(id: UUID): Promise<Trip> {
  const res = await query(
    `
    SELECT * FROM trips WHERE id = $1
    `,
    [id]
  )
  const rawTrip = res.rows[0] as unknown as RawTrip
  const trip = {
    ...rawTrip,
    initial_date: rawTrip.initial_date.toISOString().split('T')[0],
    end_date: rawTrip.end_date.toISOString().split('T')[0]
  }

  return trip
}

export async function getAllMyTrips(): Promise<Trip[]> {
  const user_id = cookies().get('user_id')?.value
  const res = await query(`SELECT * FROM trips WHERE user_id = $1`,[user_id])
  
  const rawTrips = res.rows as RawTrip[]
  const trips = rawTrips.map((rawTrip: RawTrip) => {
    return {
      ...rawTrip,
      initial_date: rawTrip.initial_date.toISOString().split('T')[0],
      end_date: rawTrip.end_date.toISOString().split('T')[0]
    }
  })

  return trips
}

function validateTrip(trip: TripBasicInfo) {
  const { initial_date, end_date } = trip
  const initialDate = new Date(initial_date)
  const endDate = new Date(end_date)

  return {
    isValid: initialDate < endDate,
    message: 'La fecha de inicio no puede ser mayor a la fecha de fin'
  }
}

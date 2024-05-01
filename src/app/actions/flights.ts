'use server'
import { query } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Fly, Trip } from '../lib/types'
import { QueryResultBase } from 'pg'

export async function createFlight(formData: FormData) {
  'use server'
  const flight = Object.fromEntries(formData.entries()) as Fly
  const {
    trip_id,
    fly_number,
    departure_address,
    departure_date,
    arrival_address,
    arrival_date
  } = flight

  try {
    const res = await query(
      `
      SELECT * FROM trips WHERE id = $1
      `,
      [trip_id]
    )

    const rows = res.rows as unknown[] as Trip[]
    const trip: Trip = rows[0]

    const departureDate = new Date(departure_date)
    const arrivalDate = new Date(arrival_date)

    const tripInitialDate = new Date(trip.initial_date)
    const tripEndDate = new Date(trip.end_date)

    if (departureDate < tripInitialDate || arrivalDate > tripEndDate) {
      return {
        message: `Las fechas estan fuera del rango del viaje. El viaje inicia el ${tripInitialDate.toLocaleDateString(
          'es-ES'
        )} hasta ${tripEndDate.toLocaleDateString('es-ES')}`
      }
    }

    if (departureDate > arrivalDate) {
      return {
        message: 'La fecha de salida no puede ser mayor a la fecha de llegada'
      }
    }

    if (isNaN(departureDate.getTime()) || isNaN(arrivalDate.getTime())) {
      return {
        message: 'Las fechas de vuelo no son validas'
      }
    }

    await query(
      `
              INSERT INTO flys ( fly_number, arrival_address, departure_date, arrival_date, departure_address, trip_id)
              VALUES ($1, $2, $3, $4, $5, $6)
          `,
      [
        fly_number,
        arrival_address,
        departure_date,
        arrival_date,
        departure_address,
        trip_id
      ]
    )
  } catch (error) {
    console.log('🚀 ~ createFlight ~ error:', error)
    return {
      message: 'Hubo un error, revise el formulario e intente mas tarde.'
    }
  }

  revalidatePath(`/${flight.trip_id}/vuelos`)
  redirect(`/${flight.trip_id}/vuelos`)
}

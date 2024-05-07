'use server'
import { query } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { FlightBasicInfo, Flight, Trip } from '../lib/types'
import { del, list } from '@vercel/blob'

type RawFlight = {
  id: string
  fly_number: string
  departure_address: string
  departure_date: Date
  arrival_address: string
  arrival_date: Date
  trip_id: string
}

export async function createFlight(flight: FlightBasicInfo) {
  'use server'
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

    const { isValid, message } = validateFlight({ flight, trip })
    if (isValid) {
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
    } else {
      return { message }
    }
  } catch (error) {
    console.log('🚀 ~ createFlight ~ error:', error)
    return {
      message: 'Hubo un error, revise el formulario e intente mas tarde.'
    }
  }

  revalidatePath(`/${flight.trip_id}/vuelos`)
  redirect(`/${flight.trip_id}/vuelos`)
}

export async function getFlightById(flightId: string) {
  const res = await query(
    `
    SELECT * FROM flys WHERE id = $1
    `,
    [flightId]
  )

  const rawFlight = res.rows[0] as unknown as RawFlight
  const flight: Flight = {
    ...rawFlight,
    departure_date: rawFlight.departure_date.toISOString().slice(0, 16),
    arrival_date: rawFlight.arrival_date.toISOString().slice(0, 16)
  }

  return flight
}

export async function updateFlifht(flight: Flight) {
  const {
    id,
    fly_number,
    departure_address,
    departure_date,
    arrival_address,
    arrival_date,
    trip_id
  } = flight

  try {
    const res = await query(
      `
      SELECT * FROM trips WHERE id = $1
      `,
      [trip_id]
    )

    const trip = res.rows[0] as unknown as Trip

    const { isValid, message } = validateFlight({ flight, trip })

    if (!isValid) {
      return { message }
    }

    await query(
      `
            UPDATE flys
            SET fly_number = $1, departure_address = $2, departure_date = $3, arrival_address = $4, arrival_date = $5
            WHERE id = $6
        `,
      [
        fly_number,
        departure_address,
        departure_date,
        arrival_address,
        arrival_date,
        id
      ]
    )
  } catch (error) {
    console.log('🚀 ~ updateFlifht ~ error:', error)
    return {
      message: 'Hubo un error, revise el formulario e intente mas tarde.'
    }
  }

  revalidatePath(`/${flight.trip_id}/vuelos`)
  redirect(`/${flight.trip_id}/vuelos`)
}

function validateFlight({
  flight,
  trip
}: {
  flight: FlightBasicInfo
  trip: Trip
}): { isValid: boolean; message: string } {
  const departureDate = new Date(flight.departure_date)
  const arrivalDate = new Date(flight.arrival_date)

  const tripInitialDate = new Date(trip.initial_date)
  const tripEndDate = new Date(trip.end_date)

  if (departureDate < tripInitialDate || arrivalDate > tripEndDate) {
    return {
      isValid: false,
      message: `Las fechas estan fuera del rango del viaje. El viaje inicia el ${tripInitialDate.toLocaleDateString(
        'es-ES'
      )} hasta ${tripEndDate.toLocaleDateString('es-ES')}`
    }
  }

  if (departureDate > arrivalDate) {
    return {
      isValid: false,
      message: 'La fecha de salida no puede ser mayor a la fecha de llegada'
    }
  }

  if (isNaN(departureDate.getTime()) || isNaN(arrivalDate.getTime())) {
    return {
      isValid: false,
      message: 'Las fechas de vuelo no son validas'
    }
  }

  return { isValid: true, message: '' }
}

export async function deleteFlight({
  flightId,
  tripId
}: {
  flightId: string
  tripId: string
}) {
  const files = await list({ prefix: `${tripId}/vuelos/${flightId}` })
  files.blobs.forEach(async (file) => {
    await del(file.url)
  })

  await query(
    `
    DELETE FROM flys WHERE id = $1
    `,
    [flightId]
  )

  revalidatePath(`/`)
}

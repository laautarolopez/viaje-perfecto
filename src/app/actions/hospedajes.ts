'use server'

import { revalidatePath } from 'next/cache'
import { query } from '../lib/db'
import { Hospedaje, Trip } from '../lib/types'
import { redirect } from 'next/navigation'

type RawHospedaje = {
  id: string
  name: string
  start_date: Date
  end_date: Date
  phone: string
  address: string
  price_per_night: number
  paid: number
  trip_id: string
}

export async function getHospedajeById(id: string) {
  'use server'
  const res = await query(
    `
        SELECT * FROM hospedajes WHERE id = $1
        `,
    [id]
  )

  const rawHospedaje = res.rows[0] as unknown as RawHospedaje
  console.log('🚀 ~ getHospedajeById ~ rawHospedaje:', rawHospedaje)

  const hospedaje: Hospedaje = {
    ...rawHospedaje,
    start_date: rawHospedaje.start_date.toISOString().slice(0, 16),
    end_date: rawHospedaje.end_date.toISOString().slice(0, 16)
  }
  return hospedaje
}

export async function updateHospedaje(hospedaje: Hospedaje) {
  'use server'
  const {
    id,
    address,
    end_date,
    name,
    paid,
    phone,
    price_per_night,
    start_date,
    trip_id
  } = hospedaje

  const res = await query(
    `
      SELECT * FROM trips WHERE id = $1
      `,
    [trip_id]
  )

  const rows = res.rows as unknown[] as Trip[]
  const trip: Trip = rows[0]
  const { isValid, message } = validateHospedaje({ hospedaje, trip })

  if (!isValid) {
    return { message }
  }

  try {
    const res = await query(
      `
            UPDATE hospedajes
            SET address = $1, end_date = $2, name = $3, paid = $4, phone = $5, price_per_night = $6, start_date = $7
            WHERE id = $8
            `,
      [address, end_date, name, paid, phone, price_per_night, start_date, id]
    )
  } catch (error) {
    console.log('🚀 ~ updateHospedaje ~ error:', error)
    return {
      message: 'Hubo un error, revise el formulario e intente mas tarde.'
    }
  }

  revalidatePath(`/${hospedaje.trip_id}/hospedajes`)
  redirect(`/${hospedaje.trip_id}/hospedajes`)
}

export async function createHospedaje(hospedaje: Hospedaje) {
  'use server'
  const {
    trip_id,
    address,
    end_date,
    name,
    paid,
    phone,
    price_per_night,
    start_date
  } = hospedaje

  try {
    //TODO: refactorizar esto, para que sea generico y poder reutilizarlo. Se repite en vuelo.
    const res = await query(
      `
        SELECT * FROM trips WHERE id = $1
        `,
      [trip_id]
    )

    const rows = res.rows as unknown[] as Trip[]
    const trip: Trip = rows[0]

    const { isValid, message } = validateHospedaje({ hospedaje, trip })
    if (isValid) {
      await query(
        `
            INSERT INTO hospedajes (trip_id, address, end_date, name, paid, phone, price_per_night, start_date)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        [
          trip_id,
          address,
          end_date,
          name,
          paid,
          phone,
          price_per_night,
          start_date
        ]
      )
    } else {
      return { message }
    }
  } catch (error) {
    console.log('🚀 ~ createHospedaje ~ error:', error)
    return {
      message: 'Hubo un error, revise el formulario e intente mas tarde.'
    }
  }

  revalidatePath(`/${hospedaje.trip_id}/hospedajes`)
  redirect(`/${hospedaje.trip_id}/hospedajes`)
}

export async function deleteHospedaje({
  hospedajeId,
  tripId
}: {
  hospedajeId: string
  tripId: string
}) {
  await query(
    `
            DELETE FROM hospedajes WHERE id = $1
            `,
    [hospedajeId]
  )

  revalidatePath(`/${tripId}/hospedajes`)
  redirect(`/${tripId}/hospedajes`)
}

//TODO: agregar validacion de que si existe un viaje en esa fecha, lanza un error.
function validateHospedaje({
  hospedaje,
  trip
}: {
  hospedaje: Hospedaje
  trip: Trip
}): { isValid: boolean; message: string } {
  const checkIn = new Date(hospedaje.start_date)
  const checkout = new Date(hospedaje.end_date)
  console.log('🚀 ~ checkIn:', checkIn, checkout)

  const tripInitialDate = new Date(trip.initial_date)
  const tripEndDate = new Date(trip.end_date)
  console.log('🚀 ~ tripInitialDate:', tripInitialDate, tripEndDate)
  checkout.setHours(0, 0, 0, 0)
  tripEndDate.setHours(0, 0, 0, 0)

  if (checkIn < tripInitialDate || checkout > tripEndDate) {
    return {
      isValid: false,
      message: `Las fechas estan fuera del rango del viaje. El viaje inicia el ${tripInitialDate.toLocaleDateString(
        'es-ES'
      )} hasta ${tripEndDate.toLocaleDateString('es-ES')}`
    }
  }

  if (checkIn > checkout) {
    return {
      isValid: false,
      message: 'La fecha de Check-In no puede ser mayor a la fecha de Check-Out'
    }
  }

  if (isNaN(checkIn.getTime()) || isNaN(checkout.getTime())) {
    return {
      isValid: false,
      message: 'Las fechas son validas'
    }
  }

  return { isValid: true, message: '' }
}

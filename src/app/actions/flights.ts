'use server'
import { query } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createFlight(formData: FormData) {
  'use server'
  const form = Object.fromEntries(formData.entries())
  try {
    await query(
      `
              INSERT INTO flys ( fly_number, arrival_address, departure_date, arrival_date, departure_address, trip_id)
              VALUES ($1, $2, $3, $4, $5, $6)
          `,
      [
        form.fly_number,
        form.arrival_address,
        form.departure_date,
        form.arrival_date,
        form.departure_address,
        form.trip_id
      ]
    )
  } catch (error) {
    console.log('🚀 ~ createFlight ~ error:', error)
  }
  revalidatePath(`/${form.trip_id}/vuelos`)
  redirect(`/${form.trip_id}/vuelos`)
}

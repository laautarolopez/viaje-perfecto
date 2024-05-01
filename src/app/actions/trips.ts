'use server'
import { query } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { TripBasicInfo } from '../lib/types'

export async function createTrip(formData: FormData) {
  const tripFromForm = Object.fromEntries(formData.entries()) as TripBasicInfo

  const { user_id, name, initial_date, end_date } = tripFromForm

  try {
    const initialDate = new Date(initial_date)
    const endDate = new Date(end_date)

    if (initialDate > endDate) {
      return {
        message: 'La fecha de inicio no puede ser mayor a la fecha de fin'
      }
    }

    await query(
      `
            INSERT INTO trips ( user_id, name, initial_date, end_date)
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
}

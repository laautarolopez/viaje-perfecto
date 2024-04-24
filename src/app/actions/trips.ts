'use server'
import { query } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTrip(formData: FormData) {
  const form = Object.fromEntries(formData.entries())

  try {
    await query(
      `
            INSERT INTO trips ( user_id, name, initial_date, end_date)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) DO NOTHING;
        `,
      [form.user_id, form.name, form.initial_date, form.end_date]
    )
  } catch (error) {
    console.log('🚀 ~ createTrip ~ error:', error)
  }
  revalidatePath(`/`)
  redirect(`/`)
}

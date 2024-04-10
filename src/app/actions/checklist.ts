'use server'
import { QueryResultRow, sql } from '@vercel/postgres'
import { Note } from '../lib/types'
import { revalidatePath } from 'next/cache'
import { ca } from 'date-fns/locale'

export async function fetchChecklist(tripId: string): Promise<Note[]> {
  const data =
    await sql`SELECT * FROM notes WHERE trip_id = ${tripId} ORDER BY create_date ASC`

  return notesFromRows(data.rows)
}

export async function toggleChecklistItem(noteId: string): Promise<void> {
  try {
    await sql`UPDATE notes SET is_checked = NOT is_checked WHERE id = ${noteId}`
  } catch (error) {
    revalidatePath('/')
  } finally {
    revalidatePath('/')
  }
}

function notesFromRows(rows: QueryResultRow[]): Note[] {
  return rows.map((row: QueryResultRow) => ({
    id: row.id,
    description: row.description,
    is_checked: row.is_checked,
    create_date: row.create_date,
    trip_id: row.trip_id
  }))
}

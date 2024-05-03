'use server'
import { query } from '../lib/db'
import { QueryResultRow } from 'pg'
import { Note } from '../lib/types'
import { revalidatePath } from 'next/cache'

export async function fetchChecklist(tripId: string): Promise<Note[]> {
  const data =
    await query('SELECT * FROM notes WHERE trip_id = $1 ORDER BY created_date ASC', [tripId])

  return notesFromRows(data.rows)
}

export async function toggleChecklistItem(noteId: string): Promise<void> {
  try {
    await query('UPDATE notes SET is_checked = NOT is_checked WHERE id = $1', [noteId])
  } catch (error) {
    revalidatePath('/')
  } finally {
    revalidatePath('/')
  }
}

export async function addChecklistItem({
  description,
  tripId
}: {
  description: string
  tripId: string
}): Promise<void> {
  await query('INSERT INTO notes (description, trip_id) VALUES ($1, $2)', [description, tripId])
  revalidatePath('/')
}

function notesFromRows(rows: QueryResultRow[]): Note[] {
  return rows.map((row: QueryResultRow) => ({
    id: row.id,
    description: row.description,
    is_checked: row.is_checked,
    created_date: row.created_date,
    trip_id: row.trip_id
  }))
}

import { query } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const tripID = request.headers.get('trip_id')
  try {
    const data =
      await query(`SELECT * FROM notes WHERE trip_id = $1 ORDER BY created_date ASC`, [tripID])
    const notes = data.rows

    return NextResponse.json(notes)
  } catch (error) {
    throw new Error('There is no checklist available.')
  }
}

export async function PATCH(request: Request) {
  const noteID = request.headers.get('note_id')
  try {
    await query(`UPDATE notes SET is_checked = NOT is_checked WHERE id = $1`, [noteID])
    return NextResponse.json({ message: 'Note updated' })
  } catch (error) {
    throw new Error('Note not found.')
  }
}

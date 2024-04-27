import { query } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const note_id = request.headers.get('note_id')

  try {
    const data =
      await query(`SELECT * FROM notes WHERE id = $1`, [note_id])
    const note = data.rows[0]

    return NextResponse.json(note)
  } catch (error) {
    throw new Error('There is no checklist available.')
  }
}
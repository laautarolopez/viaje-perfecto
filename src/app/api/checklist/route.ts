import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const tripID = request.headers.get('trip_id')
  try {
    const data =
      await sql`SELECT * FROM notes WHERE trip_id = ${tripID} ORDER BY create_date ASC`
    const notes = data.rows

    return NextResponse.json(notes)
  } catch (error) {
    throw new Error('There is no checklist available.')
  }
}
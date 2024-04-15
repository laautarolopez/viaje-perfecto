import { query } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const trip_id = request.headers.get('trip_id')

  try {
    const data = await query(`SELECT * FROM trips WHERE id = $1`, [trip_id])
    const trip = data.rows[0]
    return NextResponse.json(trip)
  } catch (error) {
    throw new Error('There is no trip with that id.')
  }
}

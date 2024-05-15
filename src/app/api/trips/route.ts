import { query } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const trip_id = request.headers.get('trip_id')
  const user_id = request.headers.get('user_id')

  try {
    const data = await query(`SELECT * FROM trips WHERE id = $1 AND user_id = $2`, [trip_id, user_id])

    if(data.rows.length > 0) {
      const trip = data.rows[0]
      return NextResponse.json(trip)
    } else {
      return NextResponse.json({ error: 'There is no trip with that id.' })
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

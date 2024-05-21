import { query } from '@/app/lib/db'
import { NextResponse } from 'next/server'

//next trips endpoint
export async function GET(request: Request) {
  const userId = request.headers.get('user_id')
  try {
    const data = 
        await query(`
          SELECT trips.* FROM trips
          LEFT JOIN shared_trips ON trips.id = shared_trips.trip_id
          WHERE trips.initial_date > $1 AND (trips.user_id = $2 OR (shared_trips.user_id = $2 AND shared_trips.accepted = true))
          ORDER BY initial_date ASC
        `, [new Date(), userId])
    const trips = data.rows

    return NextResponse.json(trips)
  } catch (error) {
    // throw new Error('There is no next trip available.')
    return NextResponse.json(error)
  }
}
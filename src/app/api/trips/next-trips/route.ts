import { query } from '@/app/lib/db'
import { NextResponse } from 'next/server'

//next trips endpoint
export async function GET(request: Request) {
  const userId = request.headers.get('user_id')
  try {
    const data =
        await query(`SELECT * FROM trips WHERE initial_date > $1 AND user_id = $2 ORDER BY initial_date ASC`, [new Date(), userId])
    const trips = data.rows

    return NextResponse.json(trips)
  } catch (error) {
    // throw new Error('There is no next trip available.')
    return NextResponse.json(error)
  }
}
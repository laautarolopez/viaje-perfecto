import { query } from '@/app/lib/db'
import { NextResponse } from 'next/server'
import { Flight, Trip } from '@/app/lib/types'
import { QueryResult } from 'pg'
import { RawTrip } from '@/app/actions/trips'

//next trip endpoint
export async function GET(request: Request) {
  const userId = request.headers.get('user_id')

  try {
    const nextTripData = (await query(
      `SELECT * FROM trips WHERE initial_date > NOW() AND user_id = $1 ORDER BY initial_date ASC LIMIT 1`,
      [userId]
    )) as unknown as QueryResult<RawTrip>
    const nextTrip: RawTrip = nextTripData.rows[0]

    const nextFlyData = (await query(
      `SELECT * FROM flys WHERE trip_id = $1 ORDER BY departure_date ASC LIMIT 1`,
      [nextTrip.id]
    )) as unknown as QueryResult<Flight>
    const nextFly: Flight = nextFlyData?.rows?.[0]
    const nextTripResponse = {
      ...nextTrip,
      initial_date: nextTrip.initial_date.toISOString().split('T')[0],
      end_date: nextTrip.end_date.toISOString().split('T')[0],
      departure_date: nextFly?.departure_date,
      departure_address: nextFly?.departure_address
    }
    return NextResponse.json(nextTripResponse)
  } catch (error) {
    throw new Error('There is no next trip available.')
  }
}

// export async function POST(request: Request) {
//   // const userId = request.headers.get("userid");
//   const userId = await request.json()
//   console.log(userId)
//   try {
//     const data =
//       await sql`SELECT * FROM trips WHERE date > NOW() ORDER BY date ASC LIMIT 1`
//     const nextTrip = data.rows[0]
//     return NextResponse.json(userId)
//   } catch (error) {
//     throw new Error('There is no next trip available.')
//   }
// }

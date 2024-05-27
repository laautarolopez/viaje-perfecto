import { query } from '@/app/lib/db'
import { NextResponse } from 'next/server'
import { Flight, Trip } from '@/app/lib/types'
import { QueryResult } from 'pg'
import { RawTrip } from '@/app/actions/trips'

//next trip endpoint
export async function GET(request: Request) {
  const user_id = request.headers.get('user_id')

  try {
    const nextTripData = 
        await query(`
          SELECT trips.* FROM trips
          LEFT JOIN shared_trips ON trips.id = shared_trips.trip_id
          WHERE trips.initial_date > $1 AND (trips.user_id = $2 OR (shared_trips.user_id = $2 AND shared_trips.accepted = true))
          ORDER BY initial_date ASC LIMIT 1
        `, [new Date(), user_id]) as unknown as QueryResult<RawTrip>
    const nextTrip: RawTrip = nextTripData.rows[0]

    if(!nextTrip) return NextResponse.json({id: undefined})

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
    console.log(error)
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

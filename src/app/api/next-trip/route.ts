import { query } from '@/app/lib/db'
import { NextResponse } from 'next/server'
import { Fly, Trip } from '@/app/lib/types'
import { QueryResult } from 'pg'

//next trip endpoint
export async function GET(request: Request) {
  const userId = request.headers.get('user_id')

  try {
    const nextTripData = await query(`SELECT * FROM trips WHERE initial_date > NOW() AND user_id = $1 ORDER BY initial_date ASC LIMIT 1`, [userId]) as unknown as QueryResult<Trip>
    const nextTrip: Trip = nextTripData.rows[0]
    console.log(nextTrip, 'nextTripdata') 

    const nextFlyData = await query(`SELECT * FROM flys WHERE trip_id = $1 ORDER BY departure_date ASC LIMIT 1`, [nextTrip.id]) as unknown as QueryResult<Fly>
    const nextFly: Fly = nextFlyData?.rows?.[0]

    const nextTripResponse = {
      ...nextTrip,
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

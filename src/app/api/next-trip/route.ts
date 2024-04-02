import { sql } from '@vercel/postgres'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

//next trip endpoint
export async function GET(request: Request) {
  const userId = request.headers.get('user_id')
  // const userId = request.query.userid;

  try {
    const data =
      await sql`SELECT * FROM trips WHERE initial_date > NOW() AND user_id = ${userId} ORDER BY initial_date ASC LIMIT 1`
    const nextTrip = data.rows[0]
    return NextResponse.json(nextTrip)
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

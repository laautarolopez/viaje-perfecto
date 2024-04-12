import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

//next trips endpoint
export async function GET(request: Request) {
  const userId = request.headers.get('user_id')
  try {
    const data =
        await sql`SELECT * FROM trips WHERE initial_date > NOW() AND user_id = ${userId} ORDER BY initial_date ASC`
    const trips = data.rows

    return NextResponse.json(trips)
  } catch (error) {
    throw new Error('There is no next trip available.')
  }
}
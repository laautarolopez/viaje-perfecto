import { query } from '@/app/lib/db'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

//hospedajes endpoint
export async function GET(request: Request) {
  const tripID = request.headers.get('trip_id')
  const user_id = cookies().get('user_id')

  try {
    
    const data =
      await query(`SELECT * FROM hospedajes WHERE trip_id = $1 ORDER BY start_date ASC`, [tripID])
    const hospedajes = data.rows

    return NextResponse.json(hospedajes)
  } catch (error) {
    throw new Error('There is no hospedajes available.')
  }
}
import { query } from '@/app/lib/db'
import { NextResponse } from 'next/server'

//next trip endpoint
export async function GET(request: Request) {
  const tripID = request.headers.get('trip_id')
  try {
    //fetch al flys
    const data =
      await query(`SELECT * FROM flys WHERE trip_id = $1 ORDER BY departure_date ASC`, [tripID])
    const flys = data.rows

    return NextResponse.json(flys)
  } catch (error) {
    throw new Error('There is no next trip available.')
  }
}

// import { Router, Request, Response } from 'express';
// import { Fly } from '../models/fly';

// const router: Router = Router();

// // GET all flys
// router.get('/', async (req: Request, res: Response) => {
//     try {
//         const flys: Fly[] = await Fly.find();
//         res.status(200).json(flys);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// export const flyRouter: Router = router;

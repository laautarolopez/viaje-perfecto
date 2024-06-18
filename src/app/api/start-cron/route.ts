import { NextResponse } from 'next/server'
import { job } from '@/components/Cron'

export async function POST(request: Request) {
  job.start()
  return NextResponse.json({ message: 'Cron started' })
}
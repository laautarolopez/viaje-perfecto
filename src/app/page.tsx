import React, { Suspense, useEffect } from 'react'
import 'react-calendar/dist/Calendar.css'
import NextTripCard from './components/NextTripCard'
import CheckListContainer from '@/components/checklist/CheckListContainer'
import CardCalendar from '@/app/components/CardCalendar'
import DaysToTravel from '@/components/DaysToTravel'
import { fetchNextTrip } from './lib/services/trips'
import Dates from './components/Dates'
import AirportTip from './components/AirportTip'
import FutureTrips from './components/FutureTrips'
import Link from 'next/link'

export default async function Home() {
  const {
    name,
    end_date,
    id,
    initial_date,
    user_id,
    departure_address,
    departure_date
  } = await fetchNextTrip()

  return (
    <div className="p-5">
      <header className="pb-5">
        <h1 className="text-4xl font-bold mb-5">Tu próximo viaje</h1>
        <DaysToTravel initialDate={initial_date} />
      </header>
      <main className="grid">
        <NextTripCard name={name} tripId={id} />
        <Dates initial_date={initial_date} end_date={end_date} />
        <Suspense fallback={<div>Loading...</div>}>
          <CardCalendar initialDate={initial_date} endDate={end_date} />
        </Suspense>
        <AirportTip
          departure_address={departure_address}
          departure_date={departure_date}
        />
        <CheckListContainer tripId={id} />
        <FutureTrips />
        <Link
          href={'/agregar'}
          className="mt-10 text-center box-border rounded-lg p-4 w-full font-bold border-green-600 bg-green-300 text-green-900"
        >
          Agregar viaje
        </Link>{' '}
      </main>
    </div>
  )
}

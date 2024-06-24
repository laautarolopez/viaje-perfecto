import React, { Suspense } from 'react'
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
import { MdRestore } from "react-icons/md";

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
    <>
    {id
    ? <div className="p-5">
      <header className="pb-5">
        <h1 className="text-4xl font-bold mb-5">Tu próximo viaje</h1>
        <div className="flex justify-between items-center">
          <DaysToTravel initialDate={initial_date} />
          <Link href={`/agregar?tripId=${id}`} className="text-green-300">
            Editar viaje
          </Link>
        </div>
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
        <div className="flex justify-between items-center mt-5 mb-10">
          <Link
              href='/historial'
              className="flex items-center justify-center rounded-2xl p-3 font-bold border-green-600 bg-green-300 text-green-900"
          >
            <div className="flex justify-center items-center relative text-green-900 w-6 h-6 me-2">
              <MdRestore className="w-6 h-6" />
            </div>
            <span className="text-green-900">Historial de viajes</span>
          </Link>
        </div>
        <Link
          href={'/agregar'}
          className="mt-10 text-center box-border rounded-lg p-4 w-full font-bold border-green-600 bg-green-300 text-green-900"
        >
          Agregar viaje
        </Link>
      </main>
    </div>
    : <div className="p-5">
      <header className="pb-5">
        <h1 className="text-4xl font-bold mb-5">No tienes viajes</h1>
        <div className="flex justify-between items-center">
          <Link
            href={'/agregar'}
            className="mt-10 text-center box-border rounded-lg p-4 w-full font-bold border-green-600 bg-green-300 text-green-900"
          >
            Agregar viaje
          </Link>
        </div>
      </header>
    </div>
    }
    </>
  )
}

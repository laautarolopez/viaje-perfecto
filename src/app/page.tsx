import React, { Suspense } from 'react'
import 'react-calendar/dist/Calendar.css'
import NextTripCard from './components/NextTripCard'
import CheckList from '@/components/CheckList'
import CardCalendar from '@/app/components/CardCalendar'
import DaysToTravel from '@/components/DaysToTravel'
import { fetchNextTrip } from './lib/services/trips'

const Calendar = React.lazy(() => import('@/app/components/CardCalendar'))

export default async function Home() {
  const { name, end_date, id, image, initial_date, user_id } = await fetchNextTrip()

  return (
    <div className="p-5">
      <header className="pb-5">
        <h1 className="text-4xl font-bold mb-5">Tu próximo viaje</h1>
        <DaysToTravel initialDate={initial_date} />
      </header>
      <main>
        <NextTripCard name={name} />
        <Suspense fallback={<div>Loading...</div>}>
          <CardCalendar initialDate={initial_date} endDate={end_date} />
        </Suspense>
        <CheckList />
      </main>
    </div>
  )
}

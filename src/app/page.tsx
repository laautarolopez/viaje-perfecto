import React, { Suspense } from 'react'
import 'react-calendar/dist/Calendar.css'
import NextTripCard from './components/NextTripCard'
import CheckList from '@/components/CheckList'
import CardCalendar from '@/app/components/CardCalendar'

const Calendar = React.lazy(() => import('@/app/components/CardCalendar'))

export default function Home() {
  return (
    <div className="p-5">
      <header className="pb-5">
        <h1 className="text-4xl font-bold mb-5">Tu próximo viaje</h1>
        <div className="bg-green-300 text-green-900 rounded-3xl py-1 px-3 w-fit">
          En 2 dias viajás
        </div>
      </header>
      <main>
        <NextTripCard />
        <Suspense fallback={<div>Loading...</div>}>
          <CardCalendar />
        </Suspense>
        <CheckList />
      </main>
    </div>
  )
}

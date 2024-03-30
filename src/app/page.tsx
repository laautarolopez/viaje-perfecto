import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import NextTripCard from './components/NextTripCard'
import CheckList from '@/components/CheckList';

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
        <Calendar
          className="text-white rounded-3xl !w-full !bg-green-900 overflow-hidden"
          defaultValue={[new Date(2024, 2, 22), new Date(2024, 2, 26)]}
        />
        <CheckList />
      </main>
    </div>
  )
}

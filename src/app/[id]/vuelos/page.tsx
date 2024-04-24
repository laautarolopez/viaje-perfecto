import CardBg from '../../components/CardBg'
import IconsRow from '@/components/IconsRow'
import DaysToTravel from '@/components/DaysToTravel'
import IconButton from '@/components/IconButton'
import { FaPlane } from 'react-icons/fa'
import Vuelo from './components/Vuelo'
import { fetchFlys } from '@/app/lib/services/flys'
import { fetchTripById } from '@/app/lib/services/trips'
import Link from 'next/link'
import Head from 'next/head'
import Navbar from '@/components/Navbar'

const Vuelos = async ({ params }: { params: { id: string } }) => {
  const tripId = params.id
  const flys = await fetchFlys(tripId)

  return (
    <>
      <Navbar tripId={tripId} section="vuelos" />
      <div className="grid p-5 pt-0">
        <div className="flex flex-row items-center gap-5 font-bold text-xl">
          <IconButton
            Icon={FaPlane}
            iconContainerClassName="bg-blue-600 w-10 h-10"
            iconClassName="w-5 h-5"
          />
          <p className="mt-5">Vuelos</p>
        </div>
        {flys.map((fly) => (
          <div key={fly.id}>
            <Vuelo
              id={fly.id}
              fly_number={fly.fly_number}
              departure_address={fly.departure_address}
              departure_date={fly.departure_date}
              arrival_address={fly.arrival_address}
              arrival_date={fly.arrival_date}
              trip_id={tripId}
            />
            <hr className="relative border-green-300 mt-10" />
          </div>
        ))}
        <Link
          href={`/${tripId}/vuelos/agregar`}
          className="mt-10 text-center box-border rounded-lg p-4 w-full font-bold border-green-600 bg-green-300 text-green-900"
        >
          Agregar vuelo
        </Link>{' '}
      </div>
    </>
  )
}

export default Vuelos

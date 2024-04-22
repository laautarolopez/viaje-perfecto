import CardBg from '../../components/CardBg'
import IconsRow from '@/components/IconsRow'
import DaysToTravel from '@/components/DaysToTravel'
import IconButton from '@/components/IconButton'
import { FaPlane } from 'react-icons/fa'
import Vuelo from './components/Vuelo'
import { fetchFlys } from '@/app/lib/services/flys'
import { fetchTripById } from '@/app/lib/services/trips'

const Vuelos = async ({ params }: { params: { id: string } }) => {
  const tripId = params.id
  const flys = await fetchFlys(tripId)
  const { name, initial_date } = await fetchTripById(tripId)

  return (
    <>
      <div className="p-5 relative overflow-hidden">
        <CardBg />
        <div className="flex flex-row mt-3">
          <h2 className="relative text-4xl font-bold">{name}</h2>
        </div>
        <IconsRow activeIcon="vuelos" tripId={tripId} />
        <DaysToTravel className="relative mt-5" initialDate={initial_date} />
      </div>
      <div className="p-5 pt-0">
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
      </div>
    </>
  )
}

export default Vuelos

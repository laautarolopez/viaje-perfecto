import { fetchNextTrips } from '@/app/lib/services/trips'
import FutureTripCard from './FutureTripCard'

const FutureTrips = async () => {
  let future_trips = await fetchNextTrips()

  // Elimina el primer elemento de future_trips(para no mostrar el próximo viaje ya mostrado)
  future_trips = future_trips.length > 0 ? future_trips.slice(1) : []

  return (
    <div className="mt-16">
      <h1 className="text-2xl font-bold mb-6 ">Futuros viajes</h1>
      <div className="grid grid-cols-2 gap-x-5">
        {future_trips &&
          future_trips.map((trip) => (
            <FutureTripCard key={trip.id} trip={trip} />
          ))}
      </div>
    </div>
  )
}

export default FutureTrips

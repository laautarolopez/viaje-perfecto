import { UUID } from 'crypto'
import { getTripById } from '../actions/trips'
import TripForm from './components/TripForm'
import { isUUID } from '../utils/utils'

const AgregarViajePage = async ({
  searchParams
}: {
  searchParams: { tripId?: string }
}) => {
  const tripId = searchParams?.tripId
  const trip = isUUID(tripId) ? await getTripById(tripId) : null

  return <TripForm trip={trip} />
}

export default AgregarViajePage

import Navbar from '@/components/Navbar'
import FlightForm from './componentes/FlightForm'
import { isUUID } from '@/app/utils/utils'
import { getFlightById } from '@/app/actions/flights'

type AgregarVuelosPageProps = {
  params: {
    id: string
  }
  searchParams: { flightId?: string }
}

const AgregarVuevloPage = async ({
  params,
  searchParams
}: AgregarVuelosPageProps) => {
  const tripId = params.id
  const flightId = searchParams?.flightId
  const flight = isUUID(flightId) ? await getFlightById(flightId) : null

  return (
    <>
      <Navbar tripId={tripId} section="vuelos" />
      <FlightForm flight={flight} tripId={tripId} />
    </>
  )
}

export default AgregarVuevloPage

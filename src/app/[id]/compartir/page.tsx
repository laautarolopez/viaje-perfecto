import Navbar from '@/components/Navbar'
import { isUUID } from '@/app/utils/utils'
import { getFlightById } from '@/app/actions/flights'
import ShareForm from './componentes/ShareForm'
import { getSharedUsers } from '@/app/actions/shared_trips'

type AgregarVuelosPageProps = {
  params: {
    id: string
  }
}

const CompartirVueloPage = async ({ params }: AgregarVuelosPageProps) => {
  const tripId = params.id
  const sharedUsers = await getSharedUsers(tripId)

  return (
    <>
      <Navbar tripId={tripId} section="compartir" />
      <ShareForm tripId={tripId} sharedUsers={sharedUsers} />
    </>
  )
}

export default CompartirVueloPage

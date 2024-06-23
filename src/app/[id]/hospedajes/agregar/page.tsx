import Navbar from '@/components/Navbar'
import HospedajeForm from './componentes/HospedajeForm'
import { isUUID } from '@/app/utils/utils'
import { getHospedajeById } from '@/app/actions/hospedajes'

type AgregarVuelosPageProps = {
  params: {
    id: string
  }
  searchParams: { hospedajeId?: string }
}

const AgregarHospedajePage = async ({
  params,
  searchParams
}: AgregarVuelosPageProps) => {
  const tripId = params.id
  const hospedajeId = searchParams?.hospedajeId
  const hospedaje = isUUID(hospedajeId)
    ? await getHospedajeById(hospedajeId)
    : null

  return (
    <>
      <Navbar tripId={tripId} section="hospedaje" />
      <HospedajeForm hospedaje={hospedaje} tripId={tripId} />
    </>
  )
}

export default AgregarHospedajePage

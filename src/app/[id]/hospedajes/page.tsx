import CardBg from '../../components/CardBg'
import IconsRow from '@/components/IconsRow'
import DaysToTravel from '@/components/DaysToTravel'
import IconButton from '@/components/IconButton'
import { MdHotel } from 'react-icons/md'
import { fetchHospedajes } from '@/app/lib/services/hospedajes'
import { fetchTripById } from '@/app/lib/services/trips'
import Carousel from './components/Carousel'
import Link from 'next/link'

const Hospedajes = async ({ params }: { params: { id: string } }) => {
  const tripId = params.id
  const hospedajes = await fetchHospedajes(tripId)
  const { name, initial_date } = await fetchTripById(tripId)

  return (
    <>
      <div className="p-5 relative overflow-hidden">
        <CardBg />
        <div className="flex flex-row mt-3">
          <h2 className="relative text-4xl font-bold">{name}</h2>
        </div>
        <IconsRow activeIcon="hospedaje" tripId={tripId} />
        <DaysToTravel className="relative mt-5" initialDate={initial_date} />
      </div>
      <div className="p-5 pt-0">
        <div className="flex flex-row items-center gap-5 font-bold text-xl">
          <IconButton
            Icon={MdHotel}
            iconContainerClassName="bg-orange-500 w-10 h-10"
            iconClassName="w-5 h-5"
          />
          <p className="mt-5">Hospedajes</p>
        </div>
        <Carousel hospedajes={hospedajes} tripId={tripId} />
        <hr className="relative border-green-300 my-10" />
        <Link
          href={`/${tripId}/hospedajes/agregar`}
          className="flex justify-center mt-10 text-center box-border rounded-lg p-4 w-full font-bold border-green-600 bg-green-300 text-green-900"
        >
          Agregar hospedaje
        </Link>
      </div>
    </>
  )
}

export default Hospedajes

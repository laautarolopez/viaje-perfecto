import { FaPlaneDeparture, FaPlaneArrival, FaEdit } from 'react-icons/fa'
import { MdAirplaneTicket, MdPlace, MdAccessTime } from 'react-icons/md'
import FlightBg from './flightBg'
import { Flight } from '@/app/lib/types'
import { format, parseISO } from 'date-fns'
import Blob from '@/components/blob/Blob'
import Link from 'next/link'
import DeleteElement from './DeleteElement'
import { deleteFlight } from '@/app/actions/flights'

const Vuelo = ({
  id,
  fly_number,
  departure_address,
  departure_date,
  arrival_address,
  arrival_date,
  trip_id
}: Flight) => {
  const departure_dateParse = parseISO(departure_date)
  const departure_formattedDate = format(departure_dateParse, 'dd/MM/yyyy')
  const departure_formattedTime = format(departure_dateParse, 'HH:mm')
  const arrival_dateParse = parseISO(arrival_date)
  const arrival_formattedDate = format(arrival_dateParse, 'dd/MM/yyyy')
  const arrival_formattedTime = format(arrival_dateParse, 'HH:mm')

  return (
    <>
      <div className="flex flex-row items-center mt-10">
        <MdAirplaneTicket className="text-green-300 w-10 h-10 me-5" />
        <p className="font-bold text-2xl">
          Vuelo N°: <span className="text-green-300">{fly_number}</span>
        </p>
      </div>
      <div className="flex flex-col mt-7 relative overflow-hidden rounded-xl">
        <FlightBg />
        <p className="relative text-center font-bold mt-3">
          Detalles del vuelo:
        </p>
        <div className="flex flex-col relative p-2">
          <div className="flex flex-row items-center">
            <FaPlaneDeparture className="text-green-300 me-5 w-6 h-6" />
            <p className="font-bold">Partida</p>
          </div>
          <div className="flex flex-row items-center mt-2">
            <MdPlace className="text-green-300 me-5 w-6 h-6" />
            <p>{departure_address}</p>
          </div>
          <div className="flex flex-row items-center mt-2">
            <MdAccessTime className="text-green-300 me-5 w-6 h-6" />
            <p>
              {departure_formattedDate} - {`${departure_formattedTime}hs`}
            </p>
          </div>
        </div>
        <hr className="relative border-green-300 m-2" />
        <div className="flex flex-col relative ps-2 pe-2 pt-2 pb-3">
          <div className="flex flex-row items-center">
            <FaPlaneArrival className="text-green-300 me-5 w-6 h-6" />
            <p className="font-bold">Llegada</p>
          </div>
          <div className="flex flex-row items-center mt-2">
            <MdPlace className="text-green-300 me-5 w-6 h-6" />
            <p>{arrival_address}</p>
          </div>
          <div className="flex flex-row items-center mt-2">
            <MdAccessTime className="text-green-300 me-5 w-6 h-6" />
            <p>
              {arrival_formattedDate} - {`${arrival_formattedTime}hs`}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-2">
        <Link
          href={`/${trip_id}/vuelos/agregar?flightId=${id}`}
          className="text-green-300"
        >
          <FaEdit className="text-green-300 w-5 h-5 max-w-5 max-h-5" />
        </Link>
        <DeleteElement
          deleteElement={async () => {
            'use server'
            await deleteFlight({ flightId: id, tripId: trip_id })
          }}
        />
      </div>
      <Blob folder={`${trip_id}/vuelos/${id}`} />
    </>
  )
}

export default Vuelo

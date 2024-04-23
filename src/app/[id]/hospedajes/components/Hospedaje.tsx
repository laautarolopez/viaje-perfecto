import { MdPinDrop } from "react-icons/md";
import { FaWhatsapp, FaWaze } from "react-icons/fa";
import { Hospedaje as HospedajeType } from '@/app/lib/types'
import { format, parseISO } from 'date-fns'
import Blob from '@/components/blob/Blob'

const Hospedaje = ({id, name, start_date, end_date, phone, address, price_per_night, paid, trip_id }: HospedajeType) => {
  const start_dateParse = parseISO(start_date)
  const start_formattedDate = format(start_dateParse, 'dd/MM/yyyy')
  const start_formattedTime = format(start_dateParse, 'HH:mm')
  const end_dateParse = parseISO(end_date)
  const end_formattedDate = format(end_dateParse, 'dd/MM/yyyy')
  const end_formattedTime = format(end_dateParse, 'HH:mm')

  return (
    <>
      <div className="font-bold text-2xl mt-10 text-center">{name}</div>
      <div className="flex items-center mt-10">
        <div className="flex justify-center items-center relative text-green-300 w-10 h-10 me-5">
            <MdPinDrop className='w-10 h-10' />
        </div>
        <span>{address}</span>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <a className="flex items-center justify-center mt-5 border border-green-300 rounded-xl px-5 py-2" href={"https://wa.me/549" + phone} target='_blank'>
          <div className="flex justify-center items-center relative text-green-300 w-5 h-5 me-3">
              <FaWhatsapp className='w-5 h-5' />
          </div>
          <span className='text-green-300'>{phone}</span>
        </a>
        <a className="flex items-center justify-center mt-5 border border-green-300 rounded-xl px-5 py-2" href={"https://google.com/maps/search/" + name} target='_blank'>
          <div className="flex justify-center items-center relative text-green-300 w-5 h-5 me-3">
              <FaWaze className='w-5 h-5' />
          </div>
          <span className='text-green-300'>Comenzar</span>
        </a>
      </div>
      <Blob trip_id={trip_id} fly_id={id} />
    </>
  )
}

export default Hospedaje
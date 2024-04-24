import { MdPinDrop, MdAlarmOn, MdAlarmOff, MdEventAvailable, MdEventBusy, MdAdd, MdRemove } from "react-icons/md";
import { FaWhatsapp, FaWaze } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { Hospedaje as HospedajeType } from '@/app/lib/types'
import { format, parseISO, differenceInDays } from 'date-fns'
import Blob from '@/components/blob/Blob'

const Hospedaje = ({id, name, start_date, end_date, phone, address, price_per_night, paid, trip_id }: HospedajeType) => {
  const start_dateParse = parseISO(start_date)
  const start_formattedDate = format(start_dateParse, 'dd/MM/yyyy')
  const start_formattedTime = format(start_dateParse, 'HH:mm')
  const end_dateParse = parseISO(end_date)
  const end_formattedDate = format(end_dateParse, 'dd/MM/yyyy')
  const end_formattedTime = format(end_dateParse, 'HH:mm')
  const nights = differenceInDays(end_dateParse, start_dateParse)
  const total = nights * price_per_night

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
      <div className="grid grid-cols-2 gap-5 mt-10">
        <div className="flex flex-col">
          <span className="font-bold text-green-300 text-lg">Check In:</span>
          <div className="flex items-center mt-2">
            <MdAlarmOn className="text-green-300 w-7 h-7 me-2" />
            <span className="font-bold">{start_formattedTime}hs</span>
          </div>
          <div className="flex items-center mt-2">
            <MdEventAvailable className="text-green-300 w-7 h-7 me-2" />
            <span className="font-bold">{start_formattedDate}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-green-300 text-lg">Check Out:</span>
          <div className="flex items-center mt-2">
            <MdAlarmOff className="text-green-300 w-7 h-7 me-2" />
            <span className="font-bold">{end_formattedTime}hs</span>
          </div>
          <div className="flex items-center mt-2">
            <MdEventBusy className="text-green-300 w-7 h-7 me-2" />
            <span className="font-bold">{end_formattedDate}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 w-full mt-10 bg-cyan-900 p-4 rounded-xl">
        <div className="col-span-1"></div>
        <div className="col-span-8">Cantidad de noches:</div>
        <div className="col-span-3">{nights}</div>
        <div className="col-span-1"></div>
        <div className="col-span-8">Precio por noche:</div>
        <div className="col-span-3">{price_per_night}</div>
        <div className="col-span-1 text-green-300 flex items-center"><MdRemove className="w-5 h-5" /></div>
        <div className="col-span-8">Precio total:</div>
        <div className="col-span-3">${total}</div>
        <div className="col-span-1 text-green-300 flex items-center mt-3"><MdAdd className="w-5 h-5" /></div>
        <div className="col-span-8 mt-3">Pagado:</div>
        <div className="col-span-3 mt-3">${paid}</div>
        <hr className="col-span-12 w-full border-green-300 mt-5" />
        <div className="col-span-1 text-green-300 flex items-center mt-5"><FaCircleDollarToSlot className='w-5 h-5' /></div>
        <div className="col-span-8 text-lg ps-1 mt-5">Saldo a abonar: </div>
        <div className="col-span-3 text-lg font-bold mt-5">${total - paid}</div>
      </div>
      <Blob trip_id={trip_id} folder={`${trip_id}/hospedajes/${id}`} />
    </>
  )
}

export default Hospedaje
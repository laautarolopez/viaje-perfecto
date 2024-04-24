import { Trip } from '../lib/types'
import FutureTripCardBg from './FutureTripCardBg'
import { format, parseISO } from 'date-fns'
import { FaCalendarCheck } from 'react-icons/fa'

const FutureTripCard = ({ trip }: { trip: Trip }) => {
  const { id, user_id, name, initial_date, end_date } = trip
  const initial_dateParsed = parseISO(initial_date)
  const initial_formattedDate = format(initial_dateParsed, 'dd/MM/yyyy')

  return (
    <div className="p-5 mb-5 relative rounded-xl overflow-hidden min-h-40">
      <FutureTripCardBg />
      <div className="flex flex-row flex-wrap justify-between">
        <h2 className="absolute font-bold top-5">{name}</h2>
        <div className="absolute flex flex-row bottom-5">
          <FaCalendarCheck className="text-green-300 w-5 h-5 me-2" />
          <div className="font-bold">{initial_formattedDate}</div>
        </div>
      </div>
    </div>
  )
}

export default FutureTripCard

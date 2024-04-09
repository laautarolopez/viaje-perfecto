import { MdTipsAndUpdates } from 'react-icons/md'
import { parseISO, format, subHours } from 'date-fns'

export type AireportTipProps = {
  departure_address?: string
  departure_date?: string
}

const AirportTip = ({
  departure_date,
  departure_address
}: AireportTipProps) => {
  if (!departure_date || !departure_address) return null

  const date = parseISO(departure_date)
  const dateMinusTwoHours = subHours(date, 3)
  const formattedHour = format(dateMinusTwoHours, 'HH:mm')
  return (
    <div className="flex gap-5 mt-10">
      <MdTipsAndUpdates className="w-8 h-8 text-green-300 flex-shrink-0" />
      <p className="font-bold">
        Te sugerimos llegar al <span className='italic'>'{departure_address}'</span> a las{' '}
        <span className="text-green-300 font-bold">{formattedHour}hs</span>
      </p>
    </div>
  )
}

export default AirportTip

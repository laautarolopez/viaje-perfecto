import { parseISO, differenceInDays } from 'date-fns'

type DaysToTravelProps = {
  className?: string
  initialDate: string
}

const DaysToTravel = ({ className, initialDate }: DaysToTravelProps) => {
  const initialDateParse = parseISO(initialDate)
  const daysToTravel = differenceInDays(initialDateParse, new Date())
  
  return (
    <div
      className={
        'bg-green-300 text-green-900 rounded-3xl py-1 px-3 w-fit' +
        (className ? ' ' + className : '')
      }
    >
      {daysToTravel >= 0
      ? <>En {daysToTravel} dias viajás</>
      : <>Ya viajaste</>
      }
    </div>
  )
}

export default DaysToTravel

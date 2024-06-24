import { parseISO, differenceInDays } from 'date-fns'

type DaysToTravelProps = {
  className?: string
  initialDate: string
}

const DaysToTravel = ({ className, initialDate }: DaysToTravelProps) => {
  const initialDateParse = parseISO(initialDate)
  const daysToTravel = differenceInDays(initialDateParse, new Date())
  const months = daysToTravel / 30
  const years = months / 12
  const formatDaysToTravel = () => {
    if (years >= 1) {
      const formattedYears = Math.floor(years)
      return `${formattedYears} ${formattedYears === 1 ? 'año' : 'años'}`
    } else if (months >= 1) {
      const formattedMonths = Math.floor(months)
      return `${formattedMonths} ${formattedMonths === 1 ? 'mes' : 'meses'}`
    } else {
      return `${daysToTravel} ${daysToTravel === 1 ? 'día' : 'días'}`
    }
  }
  
  return (
    <div
      className={
        'bg-green-300 text-green-900 rounded-3xl py-1 px-3 w-fit' +
        (className ? ' ' + className : '')
      }
    >
      {daysToTravel >= 0
      ? <>En {formatDaysToTravel()} viajás</>
      : <>Ya viajaste</>
      }
    </div>
  )
}

export default DaysToTravel

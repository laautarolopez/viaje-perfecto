import { differenceInDays } from 'date-fns'
import { render } from 'react-dom'

type DaysToTravelProps = {
  className?: string
  initialDate: string
}

const DaysToTravel = ({ className, initialDate }: DaysToTravelProps) => {
  const today = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'America/Argentina/Buenos_Aires'
    })
  ) //esto puede romper, tuve que hacerlo porque tengo problemas con mi computadora con los dias! Chequear si a vos te funciona bien.
  const initialDateParsed = new Date(initialDate)
  const daysToTravel = differenceInDays(initialDateParsed, today)
  const months = daysToTravel / 30
  const years = months / 12
  const renderDaysToTravel = () => {
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
      Viajás en {renderDaysToTravel()}
    </div>
  )
}

export default DaysToTravel

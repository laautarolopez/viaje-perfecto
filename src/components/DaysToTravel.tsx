type DaysToTravelProps = {
  className?: string
  initialDate: string
}

const DaysToTravel = ({ className, initialDate }: DaysToTravelProps) => {
  const today = new Date()
  const initialDateParsed = new Date(initialDate)
  const daysToTravel = Math.floor(
    (initialDateParsed.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )
  return (
    <div
      className={
        'bg-green-300 text-green-900 rounded-3xl py-1 px-3 w-fit' +
        (className ? ' ' + className : '')
      }
    >
      En {daysToTravel} dias viajás
    </div>
  )
}

export default DaysToTravel

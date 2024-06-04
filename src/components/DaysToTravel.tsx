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
  const daysToTravel = Math.floor(initialDateParsed.getDate() - today.getDate())
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

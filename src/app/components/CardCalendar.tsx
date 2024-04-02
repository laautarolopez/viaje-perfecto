'use client'

import Calendar from 'react-calendar'

type CardCalendarProps = {
  initialDate: string
  endDate: string
}
const CardCalendar = ({ initialDate, endDate }: CardCalendarProps) => {
  const initialDateParsed = new Date(initialDate)
  const endDateParsed = new Date(endDate)
  return (
    <div className="pointer-events-none relative">
      <p className="absolute top-2 left-3">
        {initialDateParsed
          .toLocaleString('es-AR', { month: 'long', year: 'numeric' })
          .toUpperCase()}
      </p>
      <Calendar
        className="text-white rounded-3xl !w-full !bg-green-900 overflow-hidden pt-10"
        defaultValue={[initialDateParsed, endDateParsed]}
        locale="es-AR"
        showNavigation={false}
      />
    </div>
  )
}

export default CardCalendar

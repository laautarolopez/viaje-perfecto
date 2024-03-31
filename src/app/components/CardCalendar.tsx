'use client'

import Calendar from 'react-calendar'

const CardCalendar = () => (
  <div className="pointer-events-none relative">
    <p className="absolute top-2 left-3">
      {new Date().toLocaleString('es-AR', { month: 'long' }).toUpperCase()}
    </p>
    <Calendar
      className="text-white rounded-3xl !w-full !bg-green-900 overflow-hidden pt-10"
      defaultValue={[new Date(2024, 2, 22), new Date(2024, 2, 26)]}
      locale="es-AR"
      showNavigation={false}
    />
  </div>
)

export default CardCalendar

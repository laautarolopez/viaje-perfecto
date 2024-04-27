'use client'
import { createFlight } from '@/app/actions/flights'
import Button from '@/components/Button/Button'
import Form from '@/components/Form/Form'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type Input = {
  key: string
  label: string
  type: string
}

const inputs: Input[] = [
  { key: 'fly_number', label: 'Número de vuelo', type: 'text' },
  { key: 'departure_address', label: 'Dirección de salida', type: 'text' },
  { key: 'departure_date', label: 'Fecha de salida', type: 'datetime-local' },
  { key: 'arrival_address', label: 'Dirección de llegada', type: 'text' },
  { key: 'arrival_date', label: 'Fecha de llegada', type: 'datetime-local' }
]

const AgregarVuevloPage = async ({ params }: { params: { id: string } }) => {
  const tripId = params.id

  const handleSubmitAction = async (formData: FormData) => {
    formData.append('trip_id', tripId)
    await createFlight(formData)
  }
  return (
    <>
      <Navbar tripId={tripId} section="vuelos" />
      <Form
        onSubmit={handleSubmitAction}
        inputs={inputs}
        onCancelUrl="/"
        title="Agregar nuevo vuelo"
      />
    </>
  )
}

export default AgregarVuevloPage

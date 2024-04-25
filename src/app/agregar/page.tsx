'use client'
import { USER_ID } from '../lib/services/trips'
import { createTrip } from '../actions/trips'
import Form, { Input } from '@/components/Form/Form'

const inputs: Input[] = [
  { key: 'name', label: 'Nombre del viaje', type: 'text' },
  { key: 'initial_date', label: 'Fecha de inicio', type: 'datetime-local' },
  { key: 'end_date', label: 'Fecha de fin', type: 'datetime-local' }
]

const AgregarViajePage = async ({ params }: { params: { id: string } }) => {
  const tripId = params.id

  const handleSubmitAction = async (formData: FormData) => {
    formData.append('user_id', USER_ID)
    await createTrip(formData)
  }
  return (
    <>
      <Form
        onSubmit={handleSubmitAction}
        inputs={inputs}
        onCancelUrl="/"
        title="Agregar nuevo viaje"
      />
    </>
  )
}

export default AgregarViajePage
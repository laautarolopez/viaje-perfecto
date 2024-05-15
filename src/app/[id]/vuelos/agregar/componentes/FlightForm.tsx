'use client'

import { createFlight, updateFlifht } from '@/app/actions/flights'
import { createTrip } from '@/app/actions/trips'
import { USER_ID } from '@/app/lib/services/trips'
import { FlightBasicInfo, Flight, TripBasicInfo } from '@/app/lib/types'
import Form, { Input } from '@/components/Form/Form'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

const inputs: Input[] = [
  { key: 'fly_number', label: 'Número de vuelo', type: 'text' },
  { key: 'departure_address', label: 'Dirección de salida', type: 'text' },
  { key: 'departure_date', label: 'Fecha de salida', type: 'datetime-local' },
  { key: 'arrival_address', label: 'Dirección de llegada', type: 'text' },
  { key: 'arrival_date', label: 'Fecha de llegada', type: 'datetime-local' }
]

type FlightFormProps = {
  tripId: string
  flight?: Flight | null
}

const FlightForm = ({ tripId, flight }: FlightFormProps) => {
  const defaultValues = flight || {
    fly_number: '',
    departure_address: '',
    departure_date: '',
    arrival_address: '',
    arrival_date: ''
  }
  const methods = useForm<FlightBasicInfo>({
    defaultValues
  })

  const handleSubmitAction = async (flightForm: FieldValues) => {
    const updatedFlight = { ...flightForm, trip_id: tripId } as FlightBasicInfo

    if (flight) {
      return await updateFlifht({ ...flight, ...flightForm })
    }
    return await createFlight(updatedFlight)
  }

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmitAction}
        inputs={inputs}
        navigateUrl={`/${tripId}/vuelos`}
        title={`${flight ? 'Editar' : 'Agregar nuevo'} vuelo`}
        isEditing={!!flight}
      />
    </FormProvider>
  )
}

export default FlightForm

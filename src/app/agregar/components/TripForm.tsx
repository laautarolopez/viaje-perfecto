'use client'

import { createTrip, getTripById, updateTrip } from '@/app/actions/trips'
import { USER_ID } from '@/app/lib/services/trips'
import { Trip, TripBasicInfo } from '@/app/lib/types'
import Form, { Input } from '@/components/Form/Form'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

const inputs: Input[] = [
  { key: 'name', label: 'Nombre del viaje', type: 'text' },
  { key: 'initial_date', label: 'Fecha de inicio', type: 'date' },
  { key: 'end_date', label: 'Fecha de fin', type: 'date' }
]

const TripForm = ({ trip }: { trip?: Trip | null }) => {
  const defaultValues = trip || {
    name: '',
    initial_date: '',
    end_date: ''
  }
  const methods = useForm<TripBasicInfo>({
    defaultValues
  })

  const handleSubmitAction = async (tripForm: FieldValues) => {
    const updatedTrip = { ...tripForm, user_id: USER_ID } as TripBasicInfo

    if (trip) {
      return await updateTrip({ ...trip, ...updatedTrip })
    }

    return await createTrip(updatedTrip)
  }

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmitAction}
        inputs={inputs}
        onCancelUrl="/"
        title={`${trip ? 'Editar' : 'Agregar nuevo'} viaje`}
        isEditing={!!trip}
      />
    </FormProvider>
  )
}

export default TripForm

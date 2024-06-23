'use client'

import { createHospedaje, updateHospedaje } from '@/app/actions/hospedajes'
import { Hospedaje } from '@/app/lib/types'
import Form, { Input } from '@/components/Form/Form'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

const inputs: Input[] = [
  { key: 'name', label: 'Nombre del Hotel', type: 'text' },
  { key: 'address', label: 'Dirección', type: 'text' },
  { key: 'start_date', label: 'Fecha de Inicio', type: 'datetime-local' },
  { key: 'end_date', label: 'Fecha de Fin', type: 'datetime-local' },
  { key: 'phone', label: 'Teléfono', type: 'tel' },
  {
    key: 'price_per_night',
    label: 'Precio por Noche',
    type: 'number',
    extraInputProps: { min: 0 }
  },
  { key: 'paid', label: 'Pagado', type: 'number', extraInputProps: { min: 0 } }
]

type HospedajeFormProps = {
  tripId: string
  hospedaje?: Hospedaje | null
}

const HospedajeForm = ({ tripId, hospedaje }: HospedajeFormProps) => {
  const defaultValues = hospedaje || {
    name: '',
    start_date: '',
    end_date: '',
    phone: '',
    address: '',
    price_per_night: 0,
    paid: 0
  }
  const methods = useForm<Hospedaje>({
    defaultValues
  })

  const handleSubmitAction = async (hospedajeForm: FieldValues) => {
    const updatedHospedaje = { ...hospedajeForm, trip_id: tripId } as Hospedaje

    if (hospedaje) {
      return await updateHospedaje({ ...hospedaje, ...hospedajeForm })
    }
    return await createHospedaje(updatedHospedaje)
  }

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmitAction}
        inputs={inputs}
        navigateUrl={`/${tripId}/hospedajes`}
        title={`${hospedaje ? 'Editar' : 'Agregar nuevo'} hospedaje`}
        isEditing={!!hospedaje}
      />
    </FormProvider>
  )
}

export default HospedajeForm

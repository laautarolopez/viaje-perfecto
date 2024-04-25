'use client'
import { createFlight } from '@/app/actions/flights'
import Button from '@/components/Button/Button'
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
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-2">Agregar nuevo vuelo</h2>
        <form className="grid gap-4" action={handleSubmitAction}>
          {inputs.map(({ key, label, type }) => (
            <div key={key} className="grid gap-1">
              <label htmlFor={key}>{label}</label>
              <input
                className="text-green-900 border border-green-900 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                type={type}
                id={key}
                name={key}
                required
              />
            </div>
          ))}
          <div className="flex gap-3 mt-3 ">
            <Button type="submit">Agregar vuelo</Button>
            <Link
              className="rounded-lg border-2 border-green-300 p-4 w-1/3 text-green-300 text-center"
              href={`/${tripId}/vuelos`}
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default AgregarVuevloPage

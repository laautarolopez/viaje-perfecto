'use client'

import { createSharedTrip, getSharedUsers } from '@/app/actions/shared_trips'
import { SharedUserWithStatus } from '@/app/lib/types'
import Form, { Input } from '@/components/Form/Form'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

const inputs: Input[] = [
  { key: 'userEmail', label: 'Email del usuario', type: 'email' }
]

type FlightFormProps = {
  tripId: string
  sharedUsers: SharedUserWithStatus[]
}

type SharedUsersStatus = {
  confirmedUsers: SharedUserWithStatus[]
  pendingUsers: SharedUserWithStatus[]
}

const ShareForm = ({ tripId, sharedUsers }: FlightFormProps) => {
  const methods = useForm<{ userEmail: string }>()

  const handleSubmitAction = async (formData: FieldValues) => {
    console.log('🚀 ~ handleSubmitAction ~ selectedUserId:', formData)
    const { userEmail } = formData as { userEmail: string }
    return await createSharedTrip({
      trip_id: tripId,
      userEmail
    })
  }

  const { confirmedUsers, pendingUsers }: SharedUsersStatus =
    sharedUsers.reduce(
      (acc: SharedUsersStatus, user) => {
        if (user.accepted) {
          acc.confirmedUsers.push(user)
        } else {
          acc.pendingUsers.push(user)
        }
        return acc
      },
      { confirmedUsers: [], pendingUsers: [] }
    )

  return (
    <>
      <div className="m-5 p-5 rounded-lg bg-green-900">
        <h2 className="text-2xl font-bold mb-2">Usuarios compartidos:</h2>
        {confirmedUsers.length === 0 ? (
          <p className="text-green-200">
            No compartes el viaje con ningun usuario.
          </p>
        ) : (
          <ul>
            {confirmedUsers.map((user) => (
              <li className="text-green-300" key={user.id}>
                {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="m-5 p-5 rounded-lg bg-green-900">
        <h2 className="text-2xl font-bold mb-2">Usuarios invitados:</h2>
        {pendingUsers.length === 0 ? (
          <p className="text-green-200">
            No tienes usuarios invitados al viaje.
          </p>
        ) : (
          <ul>
            {pendingUsers.map((user) => (
              <li className="text-green-300" key={user.id}>
                {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
      <FormProvider {...methods}>
        <Form
          onSubmit={handleSubmitAction}
          inputs={inputs}
          navigateUrl={`/`}
          title="Compartir viaje"
          submitButtonText="Compartir"
          navigateText="Volver"
        />
      </FormProvider>
    </>
  )
}

export default ShareForm

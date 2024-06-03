'use client'

import { acceptInvitation, declineInvitation } from '@/app/actions/shared_trips'
import Button from '@/components/Button/Button'
import { useTransition } from 'react'

type InvitationProps = {
  invitation: {
    sharedId: string
    userEmail: string
    tripName: string
    tripId: string
  }
}

const Invitation = ({ invitation }: InvitationProps) => {
  const { sharedId, userEmail, tripName } = invitation
  const [acceptPending, setAcceptTransition] = useTransition()
  const [rejectPending, setRejectTransition] = useTransition()

  const handleAccept = async () => {
    setAcceptTransition(async () => {
      await acceptInvitation(sharedId)
    })
  }

  const handleReject = async () => {
    setRejectTransition(async () => {
      await declineInvitation(sharedId)
    })
  }

  return (
    <div className="p-5 rounded-lg bg-green-900" key={sharedId}>
      <p className="font-bold">Invitacion de:</p>
      <p className="text-green-300 mb-3">{userEmail}</p>
      <p className="font-bold">Para el viaje:</p>
      <p className="text-green-300">{tripName}</p>
      <div className="flex gap-4 pt-5">
        <Button
          className="rounded-lg p-4 w-2/3 font-bold border-green-600 bg-green-300 text-green-900"
          onClick={handleAccept}
          type="button"
          isLoading={acceptPending}
          disabled={rejectPending}
        >
          Aceptar
        </Button>
        <Button
          className="bg-red-300 text-red-900"
          onClick={handleReject}
          disabled={acceptPending}
          type="button"
          isLoading={rejectPending}
        >
          Rechazar
        </Button>
      </div>
    </div>
  )
}

export default Invitation

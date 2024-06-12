'use client'

import { deleteNotification } from '@/app/actions/notifications'
import Button from '@/components/Button/Button'
import { useTransition } from 'react'

type NotificationProps = {
  id: string
  title: string
  message: string
}

const VisualNotification = ({ id, title, message }: NotificationProps) => {
  const [acceptPending, setAcceptTransition] = useTransition()

  const handleAccept = async () => {
    setAcceptTransition(async () => {
      await deleteNotification(id)
    })
  }

  return (
    <div className="p-5 rounded-lg bg-green-900">
      <p className="font-bold text-green-300 mb-3">{title}</p>
      <p className="font-bold">{message}</p>
      <div className="flex gap-4 pt-5">
        <Button
          className="rounded-lg p-4 w-2/3 font-bold border-green-600 bg-green-300 text-green-900"
          onClick={handleAccept}
          type="button"
          isLoading={acceptPending}
        >
          Confirmar notificación
        </Button>
      </div>
    </div>
  )
}

export default VisualNotification

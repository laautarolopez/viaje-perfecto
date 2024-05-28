'use client'

import Modal from '@/components/Modal/Modal'
import { useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import IconButton from './IconButton'
import { logout } from '@/app/actions/auth'

const LogOutModal = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  return (
    <>
      <IconButton
        Icon={IoIosLogOut}
        iconClassName="w-7 h-7"
        iconContainerClassName="mt-0 h-12 w-12"
        onClick={() => setShowConfirmationModal(true)}
      />
      {showConfirmationModal && (
        <Modal
          onConfirm={async () => {
            await logout()
            setShowConfirmationModal(false)
          }}
          onCancel={() => setShowConfirmationModal(false)}
        >
          <p>¿Estás seguro que deseas salir de tu cuenta?</p>
        </Modal>
      )}
    </>
  )
}

export default LogOutModal

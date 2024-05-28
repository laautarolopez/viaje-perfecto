'use client'

import Modal from '@/components/Modal/Modal'
import { useState } from 'react'
import { MdLogout } from 'react-icons/md'
import { logout } from '@/app/actions/auth'

const LogOutModal = ({email}: {email: string}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  return (
    <>
      {/* <IconButton
        Icon={IoIosLogOut}
        iconClassName="w-7 h-7"
        iconContainerClassName="h-12 w-12 mt-0"
        onClick={() => setShowConfirmationModal(true)}
      /> */}
      <div className='flex justify-center items-center rounded-full relative hover:cursor-pointer hover:bg-cyan-800 transition-all h-12 w-12' onClick={() => setShowConfirmationModal(true)}>
        <MdLogout className='w-7 h-7' />
      </div>
      {showConfirmationModal && (
        <Modal
          onConfirm={async () => {
            await logout()
            setShowConfirmationModal(false)
          }}
          onCancel={() => setShowConfirmationModal(false)}
        >
          <p>
            ¡Hola <span className='font-bold'>{email}</span>!<br/>
            ¿Estás seguro que deseas salir de tu cuenta?
          </p>
        </Modal>
      )}
    </>
  )
}

export default LogOutModal
